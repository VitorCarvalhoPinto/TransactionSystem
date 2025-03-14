export class User {
    readonly id?: number;
    name: string;
    cpf: string;
    email: string;
    password: string;
    ballance: number;
    adm: boolean;
  
    constructor(props: Omit<User, "id">, id?: number) {
      Object.assign(this, props);
      if (!id) {
        this.id = id
      }
    }
  }