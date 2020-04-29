export interface ShopPurchase {
  id: string;
  codigo: string;
  valor: number;
  data: string;
  cashBackPerc: number;
  statusID: number;
  userID: number;
  st: {
    desc: string;
    color: string;
  };
}

export interface StatusPurchase {
  id: string;
  descricao: string;
}
