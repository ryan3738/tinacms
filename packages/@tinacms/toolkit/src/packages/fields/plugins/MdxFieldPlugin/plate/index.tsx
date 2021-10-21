/**
Copyright 2021 Forestry.io Holdings, Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react'
import { Transforms } from 'slate'
import styled from 'styled-components'
import {
  Plate,
  createReactPlugin, // withReact
  createHistoryPlugin, // withHistory
  unwrapList,
  createParagraphPlugin, // paragraph element
  createBlockquotePlugin, // blockquote element
  createCodeBlockPlugin, // code block element
  createHeadingPlugin, // heading elements
  createBoldPlugin, // bold mark
  createItalicPlugin, // italic mark
  createUnderlinePlugin, // underline mark
  createStrikethroughPlugin, // strikethrough mark
  createCodePlugin, // code mark
  createPlateComponents,
  createIndentPlugin,
  createNormalizeTypesPlugin,
  createPlateOptions,
  createLinkPlugin,
  createImagePlugin,
  createBasicMarkPlugins,
  createListPlugin,
  createAutoformatPlugin,
  createResetNodePlugin,
  createTrailingBlockPlugin,
  createHorizontalRulePlugin,
  createSelectOnBackspacePlugin,
  useStoreEditorRef,
  createSoftBreakPlugin,
  createExitBreakPlugin,
  getPlatePluginTypes,
  AutoformatBlockRule,
  SPEditor,
  PlatePlugin,
  getRenderElement,
} from '@udecode/plate'
import { useSelected, useFocused, ReactEditor } from 'slate-react'
import { MdxField, ImageField } from '../field'
import { Form } from '../../../../forms'
import { CONFIG } from './config'
import { ToolbarButtons } from './toolbar'
import { useCMS } from '../../../../react-core'
import { wrapFieldsWithMeta } from '../../wrapFieldWithMeta'

import type { InputProps } from '../../../components'

export const clearBlockFormat: AutoformatBlockRule['preFormat'] = (editor) =>
  unwrapList(editor as SPEditor)

export const createTinaImagePlugin = () => {
  return {
    pluginKeys: 'img',
    voidTypes: getPlatePluginTypes('img'),
    renderElement: getRenderElement('img'),
  }
}

export const createMDXPlugin = (): PlatePlugin => ({
  pluginKeys: 'mdxJsxFlowElement',
  voidTypes: getPlatePluginTypes('mdxJsxFlowElement'),
  renderElement: getRenderElement('mdxJsxFlowElement'),
})

export const createMDXTextPlugin = (): PlatePlugin => ({
  pluginKeys: 'mdxJsxTextElement',
  voidTypes: getPlatePluginTypes('mdxJsxTextElement'),
  inlineTypes: getPlatePluginTypes('mdxJsxTextElement'),
  renderElement: getRenderElement('mdxJsxTextElement'),
})

const options = createPlateOptions()

// Transform encoded data URL to File (for image updloads)
function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

const Img = (props) => {
  const editor = useStoreEditorRef(props.name)
  const isFocused = useFocused()
  const isSelected = useSelected()
  const cms = useCMS()

  const [localState, setLocalState] = React.useState({
    caption: props.element.caption,
    url: props.element.url,
    alt: props.element.alt,
    children: [{ text: '' }],
  })
  React.useEffect(() => {
    const run = async () => {
      if (props.element.url) {
        // If it's base64 encoded, that means it came as a result of drag and drop, so upload
        // it to the media source
        if (props.element.url.startsWith('data')) {
          // FIXME: the name "tina-upload" will actually be sent to Cloudinary and stored as part
          // of the name, not currently an easy way to grab the name of the
          // dropped file in the base64 url
          const file = dataURLtoFile(props.element.url, 'tina-upload')
          const allMedia = await cms.media.persist([
            {
              directory: '',
              file,
            },
          ])
          // FIXME: if the user submits the form before this is updated they'll get
          // the base64 data url stored in markdown, which would be bad because it's
          // potentially very large. We should probably freeze form submission until
          // this is updated to mitigate that.
          setLocalState({ ...localState, url: allMedia[0].previewSrc })
        }
      }
      Transforms.setNodes(editor, localState, {
        at: ReactEditor.findPath(editor, props.element),
      })
    }
    run()
  }, [editor, JSON.stringify(localState)])
  const id = props.element.name + Math.floor(Math.random() * 100)
  const form = React.useMemo(() => {
    return new Form({
      id,
      label: id,
      initialValues: {
        url: props.element.url,
        caption: props.element.caption,
        alt: props.element.alt,
      },
      onChange: ({ values }) => {
        // @ts-ignore onChange values uses `any` heavily, making typechecking useless
        setLocalState(values)
      },
      onSubmit: () => {},
      fields: [
        {
          name: 'url',
          label: 'Source',
          component: 'image',
        },
        {
          name: 'caption',
          label: 'Caption',
          component: 'text',
        },
        {
          name: 'alt',
          label: 'Alt',
          component: 'text',
        },
      ],
    })
  }, [setLocalState])
  return (
    <div
      {...props.attributes}
      style={{
        boxShadow: isSelected && isFocused ? '0 0 0 3px #B4D5FF' : 'none',
      }}
    >
      <div
        style={{
          userSelect: 'none',
        }}
        contentEditable={false}
      >
        <ImageField tinaForm={form}>
          <figure>
            <img
              style={{ width: '100%' }}
              src={localState.url}
              alt={props.element.alt}
            />
            <figcaption
              style={{
                display: 'block',
                margin: '8px auto 0',
                textAlign: 'center',
              }}
            >
              {localState.caption}
            </figcaption>
          </figure>
        </ImageField>
      </div>
      {props.children}
    </div>
  )
}

export const RichEditor = wrapFieldsWithMeta<
  InputProps,
  { templates: unknown[] }
>((props) => {
  const [value, setValue] = React.useState(
    props.input.value.children
      ? [...props.input.value.children?.map(normalize)]
      : [{ type: 'p', children: [{ type: 'text', text: '' }] }]
  )

  const templates = props.field.templates

  React.useEffect(() => {
    props.input.onChange({ type: 'root', children: value })
  }, [JSON.stringify(value)])
  const name = props.input.name
  const components = createPlateComponents({
    img: (props) => <Img {...props} name={name} />,
    mdxJsxTextElement: (props) => {
      return <MdxPicker {...props} templates={templates} inline={true} />
    },
    mdxJsxFlowElement: (props) => {
      return <MdxPicker {...props} templates={templates} inline={false} />
    },
  })

  const pluginsBasic = [
    createTinaImagePlugin(),
    createMDXPlugin(),
    createMDXTextPlugin(),
    // editor
    createReactPlugin(), // withReact
    createHistoryPlugin(), // withHistory
    createHorizontalRulePlugin(),
    // elements
    createParagraphPlugin(), // paragraph element
    createBlockquotePlugin(), // blockquote element
    createCodeBlockPlugin(), // code block element
    createHeadingPlugin(), // heading elements
    createLinkPlugin(), // link elements
    createListPlugin(),
    createImagePlugin(),
    // marks
    createBoldPlugin(), // bold mark
    createItalicPlugin(), // italic mark
    createUnderlinePlugin(), // underline mark
    createStrikethroughPlugin(), // strikethrough mark
    createCodePlugin(), // code mark
    ...createBasicMarkPlugins(),
    // autoformat rules
    // createAutoformatPlugin(optionsAutoformat),
    // createResetNodePlugin(optionsResetBlockTypePlugin),
    // createSoftBreakPlugin(optionsSoftBreakPlugin),
    // createExitBreakPlugin(optionsExitBreakPlugin),
    // createTrailingBlockPlugin({
    //   type: ELEMENT_PARAGRAPH,
    // }),
    // createSelectOnBackspacePlugin({
    //   allow: [ELEMENT_IMAGE],
    // }),
    createIndentPlugin(CONFIG.indent),
    createAutoformatPlugin(CONFIG.autoformat),
    createResetNodePlugin(CONFIG.resetBlockType),
    createSoftBreakPlugin(CONFIG.softBreak),
    createExitBreakPlugin(CONFIG.exitBreak),
    createNormalizeTypesPlugin(CONFIG.forceLayout),
    createTrailingBlockPlugin(CONFIG.trailingBlock),
    createSelectOnBackspacePlugin(CONFIG.selectOnBackspace),
  ]
  return (
    <>
      <Wrapper>
        <ToolbarWrapper>
          <div>
            <ToolbarButtons name={props.input.name} templates={templates} />
          </div>
        </ToolbarWrapper>
        <PlateWrapper>
          <Plate
            id={props.input.name}
            initialValue={value}
            plugins={pluginsBasic}
            components={components}
            options={options}
            onChange={(value) => {
              setValue(value)
            }}
          />
        </PlateWrapper>
      </Wrapper>
    </>
  )
})

const normalize = (node: any) => {
  if (['mdxJsxFlowElement', 'mdxJsxTextElement', 'img'].includes(node.type)) {
    return {
      ...node,
      children: [{ type: 'text', text: '' }],
    }
  }
  if (node.children) {
    return {
      ...node,
      children: node.children.map(normalize),
    }
  }
  return node
}

export const MdxPicker = (props) => {
  const editor = useStoreEditorRef(props.name)
  const isFocused = useFocused()
  const isSelected = useSelected()
  const initialValues = props.element.props
  const activeTemplate = props.templates.find(
    (template) => template.name === props.element.name
  )
  const id = props.element.name + Math.floor(Math.random() * 100)
  const form = React.useMemo(() => {
    return new Form({
      id,
      label: id,
      initialValues,
      onChange: ({ values }) => {
        const isInline = props.element.type === 'mdxJsxTextElement'
        if (isInline) {
          const newProperties = {
            props: values,
          }
          // @ts-ignore BaseEditor fix
          Transforms.setNodes(editor, newProperties, {
            /**
             * match traverses the ancestors of the relevant node
             * so matching on type works for this, but likely won't work
             * on more complex nested mdxJsxTextElement nodes. I think
             * we'll want to match the path to the selection path, but
             * they're off by one:
             * selection.focus.path => [0, 1, 0]
             * and path is [0, 1]. I believe that's because the last
             * 0 in the focus.path array is referring to the text node
             */
            match: (node) => {
              // @ts-ignore BaseEditor fix
              if (node.type === 'mdxJsxTextElement') {
                return true
              }
              return false
            },
            // @ts-ignore Argument of type 'SPEditor' is not assignable to parameter of type 'ReactEditor'
            at: ReactEditor.findPath(editor, props.element),
          })
        } else {
          const newProperties = {
            props: values,
          }

          // @ts-ignore BaseEditor fix
          Transforms.setNodes(editor, newProperties, {
            // ts-ignore Argument of type 'SPEditor' is not assignable to parameter of type 'ReactEditor'
            at: ReactEditor.findPath(editor, props.element),
          })
        }
      },
      onSubmit: () => {},
      fields: activeTemplate ? activeTemplate.fields : [],
    })
  }, [])

  return (
    <div
      {...props.attributes}
      style={{
        display: props.inline ? 'inline-block' : 'block',
        boxShadow: isSelected && isFocused ? '0 0 0 3px #B4D5FF' : 'none',
      }}
    >
      <div
        style={{
          userSelect: 'none',
        }}
        contentEditable={false}
      >
        <MdxField
          inline={props.inline}
          tinaForm={form}
          field={activeTemplate}
        />
      </div>
      {props.children}
    </div>
  )
}

const Wrapper = styled.div``
const ToolbarWrapper = styled.div`
  z-index: 100;
  & > div {
    display: flex;
    flex-wrap: wrap;
  }
`
const PlateWrapper = styled.div`
  background: white;
  border-radius: 4px;
  border: 1px solid #efefef;
  padding: 10px;
  ul {
    list-style: disc;
  }
  ol {
    list-style: decimal;
  }
`