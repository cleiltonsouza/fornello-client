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
