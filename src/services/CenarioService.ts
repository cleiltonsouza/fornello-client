import { _modelsInput } from "src/models/_modelsInput";
import { HttpClient } from "./HttpClientService";
import { IHttpClientRequestParameters } from "./interfaces/IHttpClientRequestParameters";
import NotifyHelper from "src/helpers/NotifyHelpter";
import { _helperModel } from "../helpers/_helperModel"
import HttpStatusCode from "src/helpers/HttpStatusCode";
export class CenarioService {


    public async adicionar(cenario: any) {
        let parameters: IHttpClientRequestParameters
            = {
                url: "http://localhost:3000/cenario",

            requiresToken: false,
            payload: cenario
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
            url: "http://localhost:3000/cenario",
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

    public async atualizar(cenarioId:string, cenario: any) {
        let parameters: IHttpClientRequestParameters
            = {
              url: `http://localhost:3000/cenario/${cenarioId}`,


            requiresToken: true,
            payload: cenario
        }
        try {
            let result = await HttpClient.put(parameters);
            let notify = result.status == HttpStatusCode.OK ? NotifyHelper.sucesso() : NotifyHelper.erro(result.error);

            return notify;
        } catch (error) {
            return NotifyHelper.erro(error)
        }
    }

    public async recuperaPorId(cenarioId : string){


        let parameters: IHttpClientRequestParameters
            = {
                url: `http://localhost:3000/cenario/${cenarioId}`,
            requiresToken: true
        }
        try {
            let result = await HttpClient.get(parameters);
            return result.data.data;

        } catch (error) {
            return null
        }
        
    }


    public async excluir(cenarioId : number){
        let parameters: IHttpClientRequestParameters
            = {
            url: `http://localhost:3000/cenario/${cenarioId}`,
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