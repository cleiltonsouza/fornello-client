import { TipoMapeamentoItemEnum } from "src/enuns/TipoMapeamentoItemEnum";

export namespace _modelsInput {
  export interface Mapeamento {
    templateId: string | null;
    template: any | null;
    mapeamentoItens: MapeamentoItem[] | null;
    tipoMapeamentoItem : TipoMapeamentoItemEnum | null
    
  }
  export interface MapeamentoItem {
    mapeamentoItemId: number | null;
    pathTemplate: string | null;
    pathPersona: string | null;
    subMapeamentoItem : MapeamentoItem[] | null
  }

  export interface Cenario {
    descricao: string | null;
    mapeamentoId: string | null;
    templateId : string | null; 
    templateDescricao : string | null;
    personaId : string | null;
    persona : any | null; 
    mapeamentoTemplatePersonaCenarioItens: MapeamentoTemplatePersonaCenarioItem[] | null;
  }

  export interface MapeamentoTemplatePersonaCenarioItem{
    mapeamentoTemplatePersonaCenarioItensId : number | null,
    mapeamentoItem : MapeamentoItem | null, 
    value : any
  }

  export interface Template {
    api: string | null;
    endpoint: string | null;
    version : string | null; 
    method : string | null;
    location : string | null;
    template : any | null; 
  }
}
