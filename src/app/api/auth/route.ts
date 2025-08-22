'use server'
import { apiGet, apiPost } from "../database";
import bcrypt from 'bcrypt';


export async function POST(req: Request) {
    console.log("GET request received for user authentication");
 const query = `
    SELECT id, password 
    FROM user 
    WHERE email = ?
  `;

 let status, body;


 try {
    
     const data = await req.json();
    console.log("Data received for authentication:", data);

    let result: any = await apiGet(query, [data.email])
    console.log("Query result:", result);

  if (result.length > 0) {
    var userId = result[0].id;
    const storedHash = result[0].password;
    const isMatch = await bcrypt.compare(data.password, storedHash);
    console.log("Password match:", isMatch);
    if (isMatch) {
      status = 200;
      body = { message: "Login successful", userId };
    } else {
      status = 401;
      body = { message: "Login failed" };
    }
  } else {
    status = 404;
    body = { message: "User not found" };
  }
  console.log("Response body:", body);
  return Response.json(body, {
    status,
  });
 } catch (error: any) {
    console.log(error);
  console.error(error.message);
  return Response.json(
   { error: error },
   {
     status,
   }
  );
 } 
}