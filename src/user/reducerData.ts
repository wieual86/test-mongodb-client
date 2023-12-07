export type user = {
  id: number;
  name: string;
  personal: { email: string; familyName?: string; givenName?: string; picture?: string };
};

enum data {
  _name = "user",
  user = "user"
}

export default data;
