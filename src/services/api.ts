// eslint-disable-next-line import/no-extraneous-dependencies
import { Server, Model, Response, belongsTo } from "miragejs";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function makeServer(environment = "development") {
  return new Server({
    environment,

    models: {
      user: Model,
      status: Model,
      purchases: Model.extend({
        userID: belongsTo("user"),
        statusID: belongsTo("status"),
      }),
    },
    seeds(server) {
      server.db.loadData({
        status: [
          { desc: "Em validação", color: "#ff8304" },
          { desc: "Reprovado", color: "#b11717" },
          { desc: "Aprovado", color: "#6dc72a" },
        ],
        purchases: [
          {
            codigo: "21334AA",
            valor: 123.54,
            data: "2020-04-27",
            cashBackPerc: 0,
            userID: 1,
            statusID: 1,
          },
          {
            codigo: "45386AW",
            valor: 326.97,
            data: "2020-04-15",
            cashBackPerc: 0,
            userID: 1,
            statusID: 2,
          },
          {
            codigo: "367521B",
            valor: 543,
            data: "2020-04-09",
            cashBackPerc: 10,
            userID: 1,
            statusID: 3,
          },
          {
            codigo: "12345AB",
            valor: 743,
            data: "2020-03-25",
            cashBackPerc: 5,
            userID: 1,
            statusID: 3,
          },
          {
            codigo: "76855CB",
            valor: 320,
            data: "2020-03-18",
            cashBackPerc: 0,
            userID: 1,
            statusID: 2,
          },
          {
            codigo: "32576HF",
            valor: 4655,
            data: "2020-03-08",
            cashBackPerc: 30,
            userID: 1,
            statusID: 3,
          },
          {
            codigo: "00033FG",
            valor: 667,
            data: "2020-02-15",
            cashBackPerc: 8,
            userID: 1,
            statusID: 3,
          },
          {
            codigo: "65744OP",
            valor: 113.54,
            data: "2020-02-07",
            cashBackPerc: 2,
            userID: 1,
            statusID: 3,
          },
          {
            codigo: "47829ED",
            valor: 821.44,
            data: "2020-02-01",
            cashBackPerc: 0,
            userID: 1,
            statusID: 2,
          },
          {
            codigo: "32072QQ",
            valor: 354,
            data: "2020-01-20",
            cashBackPerc: 6,
            userID: 1,
            statusID: 3,
          },
          {
            codigo: "54675PL",
            valor: 1357.4,
            data: "2020-01-19",
            cashBackPerc: 15,
            userID: 1,
            statusID: 3,
          },
          {
            codigo: "54782KG",
            valor: 278.22,
            data: "2020-01-15",
            cashBackPerc: 9,
            userID: 1,
            statusID: 3,
          },
        ],
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/users", () => {
        return this.schema.db.users;
      });

      this.post("/auth", (schema, request) => {
        const params = JSON.parse(request.requestBody);
        const findUser = schema.db.users.findBy({ email: params.email });

        if (!findUser) return new Response(400, {}, "Credencias erradas!");

        if (params.password.localeCompare(findUser.password) !== 0)
          return new Response(400, {}, "Credencias erradas!");

        return findUser;
      });

      this.post("/signup", (schema, request) => {
        const params = JSON.parse(request.requestBody);
        schema.db.users.insert({
          nome: params.nome,
          cpf: params.cpf,
          email: params.email,
          password: params.password,
        });

        return new Response(200, {}, "Usuário Criado!");
      });

      this.get("/status", () => {
        return this.schema.db.status;
      });

      this.get("purchase", (schema, request) => {
        const userId = request.queryParams.id;

        const response = schema.db.purchases.where(
          (shop: { userID: number }) => shop.userID === parseInt(userId, 10),
        );

        return response;
      });

      this.get("totalcash", async () => {
        let totalCashBack = 0;
        const shopping = await this.schema.db.purchases.where(
          (shop: { cashBackPerc: number }) => shop.cashBackPerc > 0,
        );

        shopping.map((shop: { valor: number; cashBackPerc: number }): any => {
          totalCashBack += (shop.valor * shop.cashBackPerc) / 100;
          return "";
        });

        return { total: totalCashBack };
      });

      this.post("/registerPurchase", (schema, request) => {
        const params = JSON.parse(request.requestBody);

        schema.db.purchases.insert({
          codigo: params.codigo,
          valor: params.valor,
          data: params.data,
          cashBackPerc: 0,
          cashBackValue: 0,
          userID: 1,
          statusID: 1,
        });

        return new Response(200, {}, "Usuário Criado!");
      });
    },
  });
}
