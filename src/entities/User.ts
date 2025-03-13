export class User {
    readonly id?: number;
    name: string;
    cpf: string;
    email: string;
    password: string;
    ballance: number;
  
    constructor(props: Omit<User, "id">, id?: number) {
      Object.assign(this, props);
      if (!id) {
        this.ballance = 0;
        this.id = id
      }
    }
  }