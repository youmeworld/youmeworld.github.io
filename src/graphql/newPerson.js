import gql from 'graphql-tag';

export default gql`
mutation createEntry($isPublished: Boolean!, $email: String, $name: String, $dreamDestination: String, $geometry: Json) {
  createPerson(isPublished: $isPublished, email: $email, name: $name, dreamDestination: $dreamDestination, geometry: $geometry) {
    id
    createdAt
    updatedAt
    isPublished
    email
    name
    dreamDestination
    geometry
  }
}
`;
