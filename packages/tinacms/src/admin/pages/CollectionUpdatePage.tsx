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
import { Form, FormBuilder } from '@tinacms/toolkit'
import { useParams, useHistory, Link } from 'react-router-dom'

import { transformDocumentIntoMutationRequestPayload } from '../../hooks/use-graphql-forms'

import GetCMS from '../components/GetCMS'
import GetCollection, { Collection } from '../components/GetCollection'
import GetDocument, { Document } from '../components/GetDocument'

import type { TinaCMS } from '@tinacms/toolkit'

const updateDocument = async (
  cms: TinaCMS,
  collection: Collection,
  document: Document,
  relativePath: string,
  values: any
) => {
  const { includeCollection, includeTemplate } = document.form.mutationInfo
  const params = transformDocumentIntoMutationRequestPayload(values, {
    includeCollection,
    includeTemplate,
  })

  await cms.api.tina.request(
    `mutation($collection: String!, $relativePath: String!, $params: DocumentMutation!) {
      updateDocument(
        collection: $collection, 
        relativePath: $relativePath, 
        params: $params
      ){__typename}
    }`,
    {
      variables: {
        collection: collection.name,
        relativePath,
        params,
      },
    }
  )
}

const CollectionUpdatePage = () => {
  const { collectionName, filename } = useParams()
  const history = useHistory()

  return (
    <GetCMS>
      {(cms: TinaCMS) => (
        <GetCollection
          cms={cms}
          collectionName={collectionName}
          includeDocuments={false}
        >
          {(collection: Collection) => {
            const relativePath = `${filename}.${collection.format}`

            return (
              <GetDocument
                cms={cms}
                collectionName={collection.name}
                relativePath={relativePath}
              >
                {(document) => {
                  const form = new Form({
                    id: 'update-form',
                    label: 'form',
                    fields: document.form.fields,
                    initialValues: document.values,
                    onSubmit: async (values) => {
                      await updateDocument(
                        cms,
                        collection,
                        document,
                        relativePath,
                        values
                      )
                      history.push(`/admin/collections/${collection.name}`)
                    },
                  })
                  return (
                    <>
                      <h3 className="text-xl mb-6">
                        <Link
                          className="opacity-80 hover:opacity-100 transition-opacity ease-out"
                          to={`/admin/collections/${collection.name}`}
                        >
                          {collection.label}
                        </Link>{' '}
                        - {filename}.{collection.format}
                      </h3>
                      <FormBuilder form={form} />
                    </>
                  )
                }}
              </GetDocument>
            )
          }}
        </GetCollection>
      )}
    </GetCMS>
  )
}

export default CollectionUpdatePage
