import AppDataSource from "../config/data-source";
import { Request, Response } from 'express';
import { User } from "../Model/User";

class UserController {
  public async id(req: Request, res: Response): Promise<Response> {
    const {
      id
    } = req.query;

    const user = await AppDataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .where("id = :id ",  { id: `${id}` })
      .getOne();
    
    if (user) {
        return res.json(
          user
        );
    }
    else {
      return res.json({ error: "Usuário não localizado" });
    }
  }

  public async get(req: Request, res: Response): Promise<Response> {
    const {
      search
    } = req.query;

    let user;
    search ? 
     user = await AppDataSource
      .getRepository(User)
      .createQueryBuilder("user")
      .where("name LIKE :search or email LIKE :search",  { search: `%${search}%` })
      .getMany()
    :
    user = await AppDataSource.getRepository(User).createQueryBuilder("user").getMany();
    
    if (user) {
        return res.json(
          user
        );
    }
    else {
      return res.json({ error: "Usuário não localizado" });
    }
  }
  public async date(req: Request, res: Response): Promise<Response> {
    let {
      first,
      last
    } = req.query;
   first = first+"T00:00:00.000Z";
   last = last+"T23:59:59.999Z";
    const user = await AppDataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .where("birthDate >= :firstDate AND birthDate <= :lastDate", { firstDate: first, lastDate: last })
    .getMany();
  
    
    if (user) {
        return res.json(
          user
        );
    }
    else {
      return res.json({ error: "Usuário não localizado" });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      birthDate,
      phoneNumber,
      email,
    } = req.body;
      const obj = new User();
      obj.name = name;
      obj.phoneNumber = phoneNumber;
      obj.birthDate = birthDate;
      obj.email = email;
    
    const user: any = await AppDataSource.manager.save(User, obj).catch((e) => {
      return { error: e.message };
    })
    if (user.id) {
      return res.json({
        id: user.id,
      });
    }
    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      id,
      name,
      birthDate,
      phoneNumber,
      email,
    } = req.body;
    
    const user: any = await AppDataSource.manager.findOneBy(User, { id }).catch((e) => {
      return { error: "Identificador inválido" };
    })
    user.name =name;
    user.phoneNumber = phoneNumber;
    user.email =email;
    user.birthDate = birthDate;
    
    if (user && user.id) {
      const r = await AppDataSource.manager.save(User, user).catch((e) => {
        return e;
      })
      if (!r.error) {
        return res.json({ id: user.id});
      }
      return res.json(r);
    }
    else if (user && user.error) {
      return res.json(user.error)
    }
    else {
      return res.json({ error: "Usuário não localizado" });
    }
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const {
      id
    } = req.query;
    console.log(id);
    
    try {
      const UserRepository: any = await AppDataSource.getRepository(User);
      const user: any = await UserRepository
      .createQueryBuilder("client")
      .select(['client.id'])
      .where(id)
      .getOne();
      
      if (!user) {
        return res.status(404).send({ message: "id não localizado" });
      }

      const result = await UserRepository.delete(id);
      return res.json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "An error occurred while deleting the Match" });
    }
}

}

export default new UserController();