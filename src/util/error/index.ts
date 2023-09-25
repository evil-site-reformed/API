const GenericErr = (ErrName: string) => class extends Error {
    constructor(message: string) {
        super(message)
   
   
        this.name = ErrName
        this.stack = (new Error()).stack;
    }
}

export const EnvError = GenericErr("Env Error");
export const dbError = GenericErr("Database Error, please check the .env file for your configuration.")