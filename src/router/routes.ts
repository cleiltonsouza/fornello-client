import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
      ,{
        path: 'persona',
        name: 'persona',
        component: () => import('pages/Persona/PersonaList.vue')
      }
      ,{
        path: 'personaEdit/:personaId',
        name: 'personaEdit',
        component: () => import('pages/Persona/PersonaEdit.vue')
      },{
        path: 'personaCreate',
        name: 'personaCreate',
        component: () => import('pages/Persona/PersonaCreate.vue')
      },{
        path: 'mapeamentoEdit/:mapeamentoId',
        name: 'mapeamentoEdit',
        component: () => import('pages/Mapeamento/MapeamentoEdit.vue')
      },{
        path: 'cenarioCreate',
        name: 'cenarioCreate',
        component: () => import('pages/Cenario/CenarioCreate.vue')
      },{
        path: 'cenarioEdit/:cenarioId',
        name: 'cenarioEdit',
        component: () => import('pages/Cenario/CenarioEdit.vue')
      },{
        path: 'cenario',
        name: 'cenario',
        component: () => import('pages/Cenario/CenarioList.vue')
      },
      {
        path: 'template',
        name: 'template',
        component: () => import('pages/Template/TemplateList.vue')
      },
      {
        path: 'templateEdit/:templateId',
        name: 'templateEdit',
        component: () => import('pages/Template/TemplateEdit.vue')
      },
      {
        path: 'templateCreate',
        name: 'templateCreate',
        component: () => import('pages/Template/TemplateCreate.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
