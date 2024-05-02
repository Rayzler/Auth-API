export default class User {
    constructor(
        public id: string,
        public username: string,
        public email: string,
        public password: string,
        public token?: string
    ) { }
}