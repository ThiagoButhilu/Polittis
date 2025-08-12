'use server'
import { apiGet, apiPost } from "../database";
import bcrypt from 'bcrypt';


export async function GET(req: Request, res: Response) {
 const query = `
    SELECT * FROM user
  `;

 let status, body;
 try {
  await apiGet(query, [])
   .then((res) => {
    status = 200;
    body = res;
   })
   .catch((err: Error) => {
    status = 400;
    body = { error: err };
   });
  return Response.json(body, {
   status,
  });
 } catch (error: any) {
  console.error(error.message);
  return Response.json(
   { error: error },
   {
    status: 400,
   }
  );
 }
}

export async function POST(req: Request) {
  const data = await req.json();
  console.log("Data received:", data);

  let status, responseBody;
  try {

    const checkQuery = `      SELECT * FROM user WHERE email = ?
    `;
    const existingUser = await apiGet(checkQuery, [data.email]);
    
    if(existingUser.length > 0) {
      console.log("User already exists with this email");
      status = 400;
      responseBody = { message: "Usuário já existe!" };
      return Response.json(responseBody, {
        status,
      });
    } 

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    console.log("Hashed password:", hashedPassword);
    // Query para inserir usuário
    const userQuery = `
      INSERT INTO user (name, email, password)
      VALUES (?, ?, ?)
    `;
    const userResult = await apiPost(userQuery, [
        data.name,
        data.email,
        hashedPassword
    ]);

    console.log("User created:", userResult);   

    // Obtém o ID do usuário recém inserido
    console.log("User ID:", userResult.lastID);
    const userId : number = userResult.lastID;


    // Query para inserir endereço
    const addressQuery = `
      INSERT INTO address (user_id, street, number, comp, cep, state, city, district)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await apiPost(addressQuery, [
      userId,
      data.street,
      data.number,
      data.complement,
      data.zip,
      data.state,
      data.city,
      data.district
    ]);

    status = 200;
    responseBody = { 
      message: "User and address created successfully",
      userId: userId
    };
  } catch (error: any) {
    console.log("Error creating user and address:", error.message);
    status = 400;
    responseBody = { 
      error: error.message,
      message: "Failed to create user and address"
    };
  }

  return Response.json(responseBody, {
    status,
  });
}