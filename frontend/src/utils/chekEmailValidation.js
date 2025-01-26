const regexEmailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const chekEmailValidation = (email) => {
    console.log(regexEmailValidation.test(email), 'regexValidation');

    return regexEmailValidation.test(email);
};
