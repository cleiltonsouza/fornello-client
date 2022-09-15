export namespace _modelsInput {
  export interface Mapeamento {
    templateId: string | null;
    template: any | null;
    mapeamentoItens: MapeamentoItem[] | null;
  }
  export interface MapeamentoItem {
    mapeamentoItemId: number | null;
    pathTemplate: string | null;
    pathPersona: string | null;
  }

  export interface Caso {
    descricaoCaso: string | null;
    mapeamentoId: string | null;
    mapeamentoTemplatePersonaCasoItens: MapeamentoTemplatePersonaCasoItens[] | null;
  }

  export interface MapeamentoTemplatePersonaCasoItens{
    mapeamentoId : string | null, 
    mapeamentoItem : any | null, 
    value : any
  }
}
