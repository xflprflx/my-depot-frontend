import { ISidenavData } from "../../interfaces/ISidenavData";

export const sidenavData: ISidenavData[] = [
  {
    routeLink: 'dashboard',
    icon: 'fas fa-home',
    label: 'Dashboard'
  },
  {
    routeLink: 'stock',
    icon: 'fas fa-boxes-stacked',
    label: 'Estoque',
    items: [
      {
        routeLink: 'stock/items',
        label: 'Itens'
      },
      {
        routeLink: 'stock/categories',
        label: 'Categorias'
      },
      {
        routeLink: 'stock/locations',
        label: 'Localizações',
        items: [
          { routeLink: 'stock/locations/location', label: 'Locais' },
          { routeLink: 'stock/locations/zones', label: 'Zonas' },
          { routeLink: 'stock/locations/aisles', label: 'Corredores' },
          { routeLink: 'stock/locations/racks', label: 'Estantes' },
          { routeLink: 'stock/locations/levels', label: 'Níveis' },
          { routeLink: 'stock/locations/units', label: 'Compartimentos' }
        ]
      }
    ]
  },
  {
    routeLink: 'transactions',
    icon: 'fas fa-random',
    label: 'Movimentações',
    items: [
      { routeLink: 'transactions/entries', label: 'Entradas' },
      { routeLink: 'transactions/issues', label: 'Saídas' },
      { routeLink: 'transactions/transfers', label: 'Transferências' },
      { routeLink: 'transactions/adjustments', label: 'Ajustes' },
      { routeLink: 'transactions/history', label: 'Histórico' }
    ]
  },
  {
    routeLink: 'inventory',
    icon: 'fas fa-clipboard-list',
    label: 'Inventário',
    items: [
      { routeLink: 'inventory/counts', label: 'Contagens' },
      { routeLink: 'inventory/results', label: 'Resultados' },
      { routeLink: 'inventory/pending', label: 'Ajustes Pendentes' }
    ]
  },
  {
    routeLink: 'purchases',
    icon: 'fas fa-file-invoice-dollar',
    label: 'Compras',
    items: [
      { routeLink: 'purchases/orders', label: 'Ordens de Compra' },
      { routeLink: 'purchases/suppliers', label: 'Fornecedores' }
    ]
  },
  {
    routeLink: 'reports',
    icon: 'fas fa-chart-line',
    label: 'Relatórios',
    items: [
      { routeLink: 'reports/stock-balance', label: 'Saldo por Item' },
      { routeLink: 'reports/expiration', label: 'Itens por Validade' },
      { routeLink: 'reports/traceability', label: 'Rastreabilidade' },
      { routeLink: 'reports/rotation', label: 'Giro de Estoque' }
    ]
  },
  {
    routeLink: 'admin',
    icon: 'fas fa-cog',
    label: 'Administração',
    items: [
      { routeLink: 'admin/users', label: 'Usuários' },
      { routeLink: 'admin/roles', label: 'Perfis e Permissões' },
      { routeLink: 'admin/companies', label: 'Empresas / Unidades' },
      { routeLink: 'admin/settings', label: 'Parâmetros' }
    ]
  }
]