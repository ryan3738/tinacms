import { getStaticPropsForTina } from "tinacms";

export default function HomePage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
}

export const getStaticProps = async () => {
  const tinaProps = await getStaticPropsForTina({
    query: `#graphql
      query  {
        getDocument(collection: "posts", relativePath: "anotherPost.md") {
          __typename
          ...on PostsDocument {
            id
            data {
              title
            }
            form
            values
          }        }
      }
  `,
    variables: {},
  });

  return {
    props: {
      ...tinaProps,
    },
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
