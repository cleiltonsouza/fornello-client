import { _modelsInput } from "src/models/_modelsInput";
import { HttpClient } from "./HttpClientService";
import { IHttpClientRequestParameters } from "./interfaces/IHttpClientRequestParameters";
import NotifyHelper from "src/helpers/NotifyHelpter";
import { _helperModel } from "../helpers/_helperModel"
import { STATUS_CODES } from "http";
import HttpStatusCode from "src/helpers/HttpStatusCode";
export class PersonaService {


    public async adicionar(persona: any) {

        if(persona.persona.nome == undefined){
            return NotifyHelper.erro("Favor adicionar propriedade 'nome'.")
        }


        let parameters: IHttpClientRequestParameters
            = {
                url: "http://localhost:3000/persona",

            requiresToken: false,
            payload: persona
        }
        try {
            let result = await HttpClient.post(parameters);
            let notify = result.status == HttpStatusCode.CREATED ? NotifyHelper.sucesso() : NotifyHelper.erro(result.error);

            return notify;
        } catch (error) {
            return NotifyHelper.erro(error)
        }
    }

    public async listar() {
        let parameters: IHttpClientRequestParameters
            = {
            url: "http://localhost:3000/persona",
            requiresToken: false
        }
        try {
            let result = await HttpClient.get(parameters);
            console.log(result)
            return result.data.data;
        } catch (error) {
            return null
        }
    }

    public async atualizar(personaId:string, persona: any) {

        if(persona.persona.nome == undefined){
            return NotifyHelper.erro("Favor adicionar propriedade 'nome'.")
        }
        let parameters: IHttpClientRequestParameters
            = {
              url: `http://localhost:3000/persona/${personaId}`,


            requiresToken: true,
            payload: persona
        }
        try {
            let result = await HttpClient.put(parameters);

            let notify = result.status == HttpStatusCode.OK ? NotifyHelper.sucesso() : NotifyHelper.erro(result.error);

            return notify;
        } catch (error) {
            return NotifyHelper.erro(error)
        }
    }

    public async recuperaPorId(personaId : string){


        let parameters: IHttpClientRequestParameters
            = {
                url: `http://localhost:3000/persona/${personaId}`,
            requiresToken: true
        }
        try {
            let result = await HttpClient.get(parameters);
            return result.data.data;

        } catch (error) {
            return null
        }
        
    }


    // public async excluir(idConteudo : number){
    //     let parameters: IHttpClientRequestParameters
    //         = {
    //         url: Config.api + `/api/conteudo/${idConteudo}`,
    //         requiresToken: true,
    //     }
    //     try {
    //         let result = await HttpClient.delete(parameters);
    //         let notify = result.ok ? NotifyHelper.sucesso() : NotifyHelper.erro(result.error);
        
    //         return notify;
    //     } catch (error) {
    //         return NotifyHelper.erro(error)
    //     }
    // }

}