import { _modelsInput } from "src/models/_modelsInput";
import { HttpClient } from "./HttpClientService";
import { IHttpClientRequestParameters } from "./interfaces/IHttpClientRequestParameters";
import NotifyHelper from "src/helpers/NotifyHelpter";
import { _helperModel } from "../helpers/_helperModel"
export class CasoService {


    public async adicionar(caso: any) {
        let parameters: IHttpClientRequestParameters
            = {
                url: "http://localhost:3000/caso",

            requiresToken: false,
            payload: caso
        }
        try {
            let result = await HttpClient.post(parameters);
            let notify = result.ok ? NotifyHelper.sucesso() : NotifyHelper.erro(result.error);

            return notify;
        } catch (error) {
            return NotifyHelper.erro(error)
        }
    }

    public async listar() {
        let parameters: IHttpClientRequestParameters
            = {
            url: "http://localhost:3000/caso",
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

    public async atualizar(casoId:string, caso: any) {
        let parameters: IHttpClientRequestParameters
            = {
              url: `http://localhost:3000/caso/${casoId}`,


            requiresToken: true,
            payload: caso
        }
        try {
            let result = await HttpClient.put(parameters);
            let notify = result.ok ? NotifyHelper.sucesso() : NotifyHelper.erro(result.error);

            return notify;
        } catch (error) {
            return NotifyHelper.erro(error)
        }
    }

    public async recuperaPorId(casoId : string){


        let parameters: IHttpClientRequestParameters
            = {
                url: `http://localhost:3000/caso/${casoId}`,
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