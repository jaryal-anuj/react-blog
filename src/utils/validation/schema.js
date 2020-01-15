const validationMsg = {
    required: (field, validation, args) =>{
        field = field.split('_').join(' ');
        return `${field} is required!`;
    },
    email: (field, validation, args) =>{
        return `${field} is not valid`;
    },
    min: (field, validation, args) =>{
        return `${field} should be more than ${args} characters`;
    },
    max: (field, validation, args) =>{
        return `${field} should be greater than ${args} characters`;
    },
    confirmed:(field, validation, args) =>{
        return `Confirm password should match the password`;
    }
}

const signinRules  = {
    email:'required|email',
    password:'required|min:6|max:20',

};

const registerRules  = {
    name:'required',
    email:'required|email',
    password:'required|min:6|max:20|confirmed',
    password_confirmation:'required'
};

const createPostRules  = {
    title:'required|max:50',
    description:'required|max:5000',
};

export {registerRules,validationMsg,signinRules, createPostRules}