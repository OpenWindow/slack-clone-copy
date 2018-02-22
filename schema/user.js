export default `    
    type User {
        id: Int!
        username: String!
        email: String!
        teams: [Team!]!
    }

    type Query {
        user(id: Int!): User!
        users: [User]!
    }

    type Mutation {
        createUser(username: String!, email: String!, password:String!) : User!
    }
`;