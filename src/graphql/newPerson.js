export default `
  mutation createEntry($isPublished: Boolean!, $email: String, $name: String, $dreamDestination: String) {
    createPerson(isPublished: $isPublished, email: $email, name: $name, dreamDestination: $dreamDestination) {
      id
      createdAt
      updatedAt
      isPublished
      email
      name
      dreamDestination
      __typename
    }
  }
`;