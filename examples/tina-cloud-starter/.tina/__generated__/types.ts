// DO NOT MODIFY THIS FILE. This file is automatically generated by Tina
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** References another document, used as a foreign key */
  Reference: any;
  JSON: any;
};



export type SystemInfo = {
  __typename?: 'SystemInfo';
  filename: Scalars['String'];
  basename: Scalars['String'];
  breadcrumbs: Array<Scalars['String']>;
  path: Scalars['String'];
  relativePath: Scalars['String'];
  extension: Scalars['String'];
  template: Scalars['String'];
  collection: Collection;
};


export type SystemInfoBreadcrumbsArgs = {
  excludeExtension?: Maybe<Scalars['Boolean']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasPreviousPage: Scalars['Boolean'];
  hasNextPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
  endCursor: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

export type Document = {
  sys?: Maybe<SystemInfo>;
  id: Scalars['ID'];
};

/** A relay-compliant pagination connection */
export type Connection = {
  totalCount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  getCollection: Collection;
  getCollections: Array<Collection>;
  node: Node;
  getDocument: DocumentNode;
  getDocumentList: DocumentConnection;
  getPostsDocument: PostsDocument;
  getPostsList: PostsConnection;
  getGlobalDocument: GlobalDocument;
  getGlobalList: GlobalConnection;
  getAuthorsDocument: AuthorsDocument;
  getAuthorsList: AuthorsConnection;
  getPagesDocument: PagesDocument;
  getPagesList: PagesConnection;
};


export type QueryGetCollectionArgs = {
  collection?: Maybe<Scalars['String']>;
};


export type QueryNodeArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetDocumentArgs = {
  collection?: Maybe<Scalars['String']>;
  relativePath?: Maybe<Scalars['String']>;
};


export type QueryGetDocumentListArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryGetPostsDocumentArgs = {
  relativePath?: Maybe<Scalars['String']>;
};


export type QueryGetPostsListArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryGetGlobalDocumentArgs = {
  relativePath?: Maybe<Scalars['String']>;
};


export type QueryGetGlobalListArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryGetAuthorsDocumentArgs = {
  relativePath?: Maybe<Scalars['String']>;
};


export type QueryGetAuthorsListArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryGetPagesDocumentArgs = {
  relativePath?: Maybe<Scalars['String']>;
};


export type QueryGetPagesListArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type DocumentConnectionEdges = {
  __typename?: 'DocumentConnectionEdges';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<DocumentNode>;
};

export type DocumentConnection = Connection & {
  __typename?: 'DocumentConnection';
  pageInfo?: Maybe<PageInfo>;
  totalCount: Scalars['Int'];
  edges?: Maybe<Array<Maybe<DocumentConnectionEdges>>>;
};

export type Collection = {
  __typename?: 'Collection';
  name: Scalars['String'];
  slug: Scalars['String'];
  label: Scalars['String'];
  path: Scalars['String'];
  format?: Maybe<Scalars['String']>;
  matches?: Maybe<Scalars['String']>;
  templates?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  fields?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  documents: DocumentConnection;
};


export type CollectionDocumentsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type DocumentNode = PostsDocument | GlobalDocument | AuthorsDocument | PagesDocument;

export type PostsSomeField = {
  __typename?: 'PostsSomeField';
  title?: Maybe<Scalars['String']>;
};

export type PostsAuthorDocument = AuthorsDocument;

export type Posts = {
  __typename?: 'Posts';
  someField?: Maybe<Array<Maybe<PostsSomeField>>>;
  _body?: Maybe<Scalars['JSON']>;
  title?: Maybe<Scalars['String']>;
  author?: Maybe<PostsAuthorDocument>;
  date?: Maybe<Scalars['String']>;
  heroImg?: Maybe<Scalars['String']>;
  excerpt?: Maybe<Scalars['String']>;
};

export type PostsDocument = Node & Document & {
  __typename?: 'PostsDocument';
  id: Scalars['ID'];
  sys: SystemInfo;
  data: Posts;
  form: Scalars['JSON'];
  values: Scalars['JSON'];
  dataJSON: Scalars['JSON'];
};

export type PostsConnectionEdges = {
  __typename?: 'PostsConnectionEdges';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<PostsDocument>;
};

export type PostsConnection = Connection & {
  __typename?: 'PostsConnection';
  pageInfo?: Maybe<PageInfo>;
  totalCount: Scalars['Int'];
  edges?: Maybe<Array<Maybe<PostsConnectionEdges>>>;
};

export type GlobalHeaderIcon = {
  __typename?: 'GlobalHeaderIcon';
  color?: Maybe<Scalars['String']>;
  style?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type GlobalHeaderNav = {
  __typename?: 'GlobalHeaderNav';
  href?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
};

export type GlobalHeader = {
  __typename?: 'GlobalHeader';
  icon?: Maybe<GlobalHeaderIcon>;
  color?: Maybe<Scalars['String']>;
  nav?: Maybe<Array<Maybe<GlobalHeaderNav>>>;
};

export type GlobalFooterSocial = {
  __typename?: 'GlobalFooterSocial';
  facebook?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  github?: Maybe<Scalars['String']>;
};

export type GlobalFooter = {
  __typename?: 'GlobalFooter';
  color?: Maybe<Scalars['String']>;
  social?: Maybe<GlobalFooterSocial>;
};

export type GlobalTheme = {
  __typename?: 'GlobalTheme';
  color?: Maybe<Scalars['String']>;
  font?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  darkMode?: Maybe<Scalars['String']>;
};

export type Global = {
  __typename?: 'Global';
  header?: Maybe<GlobalHeader>;
  footer?: Maybe<GlobalFooter>;
  theme?: Maybe<GlobalTheme>;
};

export type GlobalDocument = Node & Document & {
  __typename?: 'GlobalDocument';
  id: Scalars['ID'];
  sys: SystemInfo;
  data: Global;
  form: Scalars['JSON'];
  values: Scalars['JSON'];
  dataJSON: Scalars['JSON'];
};

export type GlobalConnectionEdges = {
  __typename?: 'GlobalConnectionEdges';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<GlobalDocument>;
};

export type GlobalConnection = Connection & {
  __typename?: 'GlobalConnection';
  pageInfo?: Maybe<PageInfo>;
  totalCount: Scalars['Int'];
  edges?: Maybe<Array<Maybe<GlobalConnectionEdges>>>;
};

export type Authors = {
  __typename?: 'Authors';
  name?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
};

export type AuthorsDocument = Node & Document & {
  __typename?: 'AuthorsDocument';
  id: Scalars['ID'];
  sys: SystemInfo;
  data: Authors;
  form: Scalars['JSON'];
  values: Scalars['JSON'];
  dataJSON: Scalars['JSON'];
};

export type AuthorsConnectionEdges = {
  __typename?: 'AuthorsConnectionEdges';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<AuthorsDocument>;
};

export type AuthorsConnection = Connection & {
  __typename?: 'AuthorsConnection';
  pageInfo?: Maybe<PageInfo>;
  totalCount: Scalars['Int'];
  edges?: Maybe<Array<Maybe<AuthorsConnectionEdges>>>;
};

export type PagesBlocksHeroActions = {
  __typename?: 'PagesBlocksHeroActions';
  label?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['Boolean']>;
  link?: Maybe<Scalars['String']>;
};

export type PagesBlocksHeroImage = {
  __typename?: 'PagesBlocksHeroImage';
  src?: Maybe<Scalars['String']>;
  alt?: Maybe<Scalars['String']>;
};

export type PagesBlocksHero = {
  __typename?: 'PagesBlocksHero';
  tagline?: Maybe<Scalars['String']>;
  headline?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  children?: Maybe<Scalars['JSON']>;
  richText?: Maybe<Scalars['JSON']>;
  actions?: Maybe<Array<Maybe<PagesBlocksHeroActions>>>;
  image?: Maybe<PagesBlocksHeroImage>;
  color?: Maybe<Scalars['String']>;
};

export type PagesBlocksFeaturesItemsIcon = {
  __typename?: 'PagesBlocksFeaturesItemsIcon';
  color?: Maybe<Scalars['String']>;
  style?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type PagesBlocksFeaturesItems = {
  __typename?: 'PagesBlocksFeaturesItems';
  icon?: Maybe<PagesBlocksFeaturesItemsIcon>;
  title?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

export type PagesBlocksFeatures = {
  __typename?: 'PagesBlocksFeatures';
  items?: Maybe<Array<Maybe<PagesBlocksFeaturesItems>>>;
  color?: Maybe<Scalars['String']>;
};

export type PagesBlocksContent = {
  __typename?: 'PagesBlocksContent';
  body?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
};

export type PagesBlocksTestimonial = {
  __typename?: 'PagesBlocksTestimonial';
  quote?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
};

export type PagesBlocks = PagesBlocksHero | PagesBlocksFeatures | PagesBlocksContent | PagesBlocksTestimonial;

export type Pages = {
  __typename?: 'Pages';
  blocks?: Maybe<Array<Maybe<PagesBlocks>>>;
};

export type PagesDocument = Node & Document & {
  __typename?: 'PagesDocument';
  id: Scalars['ID'];
  sys: SystemInfo;
  data: Pages;
  form: Scalars['JSON'];
  values: Scalars['JSON'];
  dataJSON: Scalars['JSON'];
};

export type PagesConnectionEdges = {
  __typename?: 'PagesConnectionEdges';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<PagesDocument>;
};

export type PagesConnection = Connection & {
  __typename?: 'PagesConnection';
  pageInfo?: Maybe<PageInfo>;
  totalCount: Scalars['Int'];
  edges?: Maybe<Array<Maybe<PagesConnectionEdges>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPendingDocument: DocumentNode;
  updateDocument: DocumentNode;
  updatePostsDocument: PostsDocument;
  updateGlobalDocument: GlobalDocument;
  updateAuthorsDocument: AuthorsDocument;
  updatePagesDocument: PagesDocument;
};


export type MutationAddPendingDocumentArgs = {
  collection: Scalars['String'];
  relativePath: Scalars['String'];
  template?: Maybe<Scalars['String']>;
};


export type MutationUpdateDocumentArgs = {
  collection: Scalars['String'];
  relativePath: Scalars['String'];
  params: DocumentMutation;
};


export type MutationUpdatePostsDocumentArgs = {
  relativePath: Scalars['String'];
  params: PostsMutation;
};


export type MutationUpdateGlobalDocumentArgs = {
  relativePath: Scalars['String'];
  params: GlobalMutation;
};


export type MutationUpdateAuthorsDocumentArgs = {
  relativePath: Scalars['String'];
  params: AuthorsMutation;
};


export type MutationUpdatePagesDocumentArgs = {
  relativePath: Scalars['String'];
  params: PagesMutation;
};

export type DocumentMutation = {
  posts?: Maybe<PostsMutation>;
  global?: Maybe<GlobalMutation>;
  authors?: Maybe<AuthorsMutation>;
  pages?: Maybe<PagesMutation>;
};

export type PostsSomeFieldMutation = {
  title?: Maybe<Scalars['String']>;
};

export type PostsMutation = {
  someField?: Maybe<Array<Maybe<PostsSomeFieldMutation>>>;
  _body?: Maybe<Scalars['JSON']>;
  title?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  heroImg?: Maybe<Scalars['String']>;
  excerpt?: Maybe<Scalars['String']>;
};

export type GlobalHeaderIconMutation = {
  color?: Maybe<Scalars['String']>;
  style?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type GlobalHeaderNavMutation = {
  href?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
};

export type GlobalHeaderMutation = {
  icon?: Maybe<GlobalHeaderIconMutation>;
  color?: Maybe<Scalars['String']>;
  nav?: Maybe<Array<Maybe<GlobalHeaderNavMutation>>>;
};

export type GlobalFooterSocialMutation = {
  facebook?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  github?: Maybe<Scalars['String']>;
};

export type GlobalFooterMutation = {
  color?: Maybe<Scalars['String']>;
  social?: Maybe<GlobalFooterSocialMutation>;
};

export type GlobalThemeMutation = {
  color?: Maybe<Scalars['String']>;
  font?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  darkMode?: Maybe<Scalars['String']>;
};

export type GlobalMutation = {
  header?: Maybe<GlobalHeaderMutation>;
  footer?: Maybe<GlobalFooterMutation>;
  theme?: Maybe<GlobalThemeMutation>;
};

export type AuthorsMutation = {
  name?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
};

export type PagesBlocksHeroActionsMutation = {
  label?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['Boolean']>;
  link?: Maybe<Scalars['String']>;
};

export type PagesBlocksHeroImageMutation = {
  src?: Maybe<Scalars['String']>;
  alt?: Maybe<Scalars['String']>;
};

export type PagesBlocksHeroMutation = {
  tagline?: Maybe<Scalars['String']>;
  headline?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  children?: Maybe<Scalars['JSON']>;
  richText?: Maybe<Scalars['JSON']>;
  actions?: Maybe<Array<Maybe<PagesBlocksHeroActionsMutation>>>;
  image?: Maybe<PagesBlocksHeroImageMutation>;
  color?: Maybe<Scalars['String']>;
};

export type PagesBlocksFeaturesItemsIconMutation = {
  color?: Maybe<Scalars['String']>;
  style?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type PagesBlocksFeaturesItemsMutation = {
  icon?: Maybe<PagesBlocksFeaturesItemsIconMutation>;
  title?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

export type PagesBlocksFeaturesMutation = {
  items?: Maybe<Array<Maybe<PagesBlocksFeaturesItemsMutation>>>;
  color?: Maybe<Scalars['String']>;
};

export type PagesBlocksContentMutation = {
  body?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
};

export type PagesBlocksTestimonialMutation = {
  quote?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
};

export type PagesBlocksMutation = {
  hero?: Maybe<PagesBlocksHeroMutation>;
  features?: Maybe<PagesBlocksFeaturesMutation>;
  content?: Maybe<PagesBlocksContentMutation>;
  testimonial?: Maybe<PagesBlocksTestimonialMutation>;
};

export type PagesMutation = {
  blocks?: Maybe<Array<Maybe<PagesBlocksMutation>>>;
};

