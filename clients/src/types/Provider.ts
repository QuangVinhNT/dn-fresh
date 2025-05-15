type Provider = {
  id: string;
  name: string;
}

type AdminProviderName = Pick<Provider, 'id' | 'name'>

export type {
  AdminProviderName
}
