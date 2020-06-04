import { Request, Response, Body, RouteParams } from "https://deno.land/x/oak/mod.ts";

interface User {
  id: string;
  name: string;
  lastName: string;
}

let users: Array<User> = [
  {
    id: "1",
    name: "Junior",
    lastName: "Sanchez"
  },
  {
    id: "2",
    name: "Ramon",
    lastName: "Sanchez"
  }
];

export const getListUsers = ({ response }: { response: Response }) => {
  response.status = 200;
  response.body = {
    status: true,
    payload: users
  };
  return;
};

export const createUser = async ({ request, response }: { request: Request; response: Response }) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      status: false,
      msg: "Body required"
    };
    return;
  }

  const data: Body = await request.body();
  const { name, lastName } = data.value;
  if (!name || !lastName) {
    response.status = 400;
    response.body = {
      status: false,
      msg: "Field required"
    };
    return;
  }
  const user: User = { id: users.length + 1, ...data.value };
  users.push(user);
  response.status = 201;
  response.body = {
    status: true,
    msg: "Save",
    payload: user
  };
  return;
};

export const getUser = ({ params, response }: { params: RouteParams; response: Response }) => {
  const { id } = params;
  const user = users.find(user => user.id === id);
  if (!user) {
    response.status = 404;
    response.body = {
      status: false,
      msg: "Not found"
    };
    return;
  }
  response.status = 200;
  response.body = {
    status: true,
    payload: user
  };
  return;
};

export const updateUser = async ({
  params,
  request,
  response
}: {
  params: RouteParams;
  request: Request;
  response: Response;
}) => {
  const { id } = params;
  const user = users.find(user => user.id === id);
  if (!user) {
    response.status = 404;
    response.body = {
      status: false,
      msg: "Not found"
    };
    return;
  }
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      status: false,
      msg: "Body required"
    };
    return;
  }

  const data: Body = await request.body();
  const { name, lastName } = data.value;
  if (!name || !lastName) {
    response.status = 400;
    response.body = {
      status: false,
      msg: "Field required"
    };
    return;
  }

  users = users.map(user => (user.id === id ? { ...user, ...data.value } : user));
  response.status = 202;
  response.body = {
    status: true,
    payload: data.value
  };
  return;
};

export const deleteUser = ({ params, response }: { params: RouteParams; response: Response }) => {
  const { id } = params;
  users = users.filter(user => user.id !== id);
  response.status = 204;
  response.body = {
    status: false,
    msg: "Deleted User"
  };
  return;
};
