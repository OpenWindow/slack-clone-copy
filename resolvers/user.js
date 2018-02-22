export default {
    Query:{
        user: (parent, {id}, {models}) => models.User.findOne({ where: { id } }),
        users: (parent, args, {models}) => models.User.findAll()
,    },
    Mutation:{
        createUser: (parent, args, {models}) => models.User.create(args),
    }
};