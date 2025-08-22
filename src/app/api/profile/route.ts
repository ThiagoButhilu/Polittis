'use server'
import { apiGet, apiPost } from "../database";


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
    console.log("GET profile");
 const query = `
    SELECT * FROM user where id = ?
  `;

 let status;

 const addressQuery = `
    SELECT * FROM address where user_id = ?
  `;

 try {
    const data = await req.json();
    console.log("Data received for query:", data);

    let result: any = await apiGet(query, [data.id])
    console.log("Query profile result:", result);

    let body: any = {};

  if (result.length > 0) {
    var userId = result[0].id;
    body.user = result[0];

    let addressResult: any = await apiGet(addressQuery, [userId]);
    console.log("Query address result:", addressResult);

    if (addressResult.length > 0) { 
      body.address = addressResult[0];
    } else {
      body.message = "Address not found";
    }

  } else {
    status = 404;
    body.message = "User not found";
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