import { _modelsInput } from "src/models/_modelsInput";
import { HttpClient } from "./HttpClientService";
import { IHttpClientRequestParameters } from "./interfaces/IHttpClientRequestParameters";
import NotifyHelper from "src/helpers/NotifyHelpter";
import { _helperModel } from "../helpers/_helperModel"
import HttpStatusCode from "src/helpers/HttpStatusCode";
import HttpConfig from "src/config/HttpConfig";
export class CenarioService {


    public async adicionar(cenario: any) {
        let resposta : any= {notificacao: "", data: {}}

        let parameters: IHttpClientRequestParameters
            = {
                url: `${HttpConfig.UriApi()}/cenario`,

            requiresToken: false,
            payload: cenario
        }
        try {
            let result = await HttpClient.post(parameters);
            let notify = result.status == HttpStatusCode.CREATED ? NotifyHelper.sucesso() : NotifyHelper.erro(result.error);
            resposta.notificacao = notify;
            resposta.data = result.data.data;

        } catch (error) {
            resposta.notificacao = NotifyHelper.erro(error)
        }

        return resposta;
    }

    public async listar() {
        let parameters: IHttpClientRequestParameters
            = {
            url: `${HttpConfig.UriApi()}/cenario`,
            requiresToken: false
        }
        try {
            let result = await HttpClient.get(parameters);
            console.log(result)
            return result.data.data;
        } catch (error) {
            return NotifyHelper.erro(error)

        }
    }

    public async atualizar(cenarioId:string, cenario: any) : Promise<any>{

        let resposta : any= {notificacao: "", data: {}}
        let parameters: IHttpClientRequestParameters
            = {
              url: `${HttpConfig.UriApi()}/cenario/${cenarioId}`,
            requiresToken: true,
            payload: cenario
        }
        try {
            let result = await HttpClient.put(parameters);
            let notify = result.status == HttpStatusCode.OK ? NotifyHelper.sucesso() : NotifyHelper.erro(result.error);
            resposta.notificacao = notify;
            resposta.data = result.data.data;

        } catch (error) {
            resposta.notificacao = NotifyHelper.erro(error)
        }

        return resposta;
    }

    public async recuperaPorId(cenarioId : string){


        let parameters: IHttpClientRequestParameters
            = {
                url: `${HttpConfig.UriApi()}/cenario/${cenarioId}`,
            requiresToken: true
        }
        try {
            let result = await HttpClient.get(parameters);
            return result.data.data;

        } catch (error) {
            return NotifyHelper.erro(error)

        }
        
    }


    public async excluir(cenarioId : number){
        let parameters: IHttpClientRequestParameters
            = {
            url: `${HttpConfig.UriApi()}/cenario/${cenarioId}`,
            requiresToken: true,
        }
        try {
            let result = await HttpClient.delete(parameters);
            let notify = result.status == HttpStatusCode.OK ? NotifyHelper.sucesso() : NotifyHelper.erro(result.error);
        
            return notify;
        } catch (error) {
            return NotifyHelper.erro(error)
        }
    }

}