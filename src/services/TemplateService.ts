import { _modelsInput } from "src/models/_modelsInput";
import { HttpClient } from "./HttpClientService";
import { IHttpClientRequestParameters } from "./interfaces/IHttpClientRequestParameters";
import NotifyHelper from "src/helpers/NotifyHelpter";
import { _helperModel } from "../helpers/_helperModel";

export class TemplateService {

    public async adicionar(template: any) {
        let parameters: IHttpClientRequestParameters = {
            url: "http://localhost:3000/template",
            requiresToken: false,
            payload: template
        }
        try {
            let result = await HttpClient.post(parameters);

            return result.status == 201 ? NotifyHelper.sucesso() : NotifyHelper.erro(result.error);
        } catch (error) {
            return NotifyHelper.erro(error)
        }
    }

    public async listar() {
        let parameters: IHttpClientRequestParameters = {
            url: "http://localhost:3000/template",
            requiresToken: false
        }
        try {
            let result = await HttpClient.get(parameters);
            return result.data.data
        } catch (error) {
            return null
        }
    }

    public async atualizar(templateId: string, template: _modelsInput.Template) {
        let parameters: IHttpClientRequestParameters = {
            url: `http://localhost:3000/template/${templateId}`,
            requiresToken: true,
            payload: template
        }
        try {
            let result = await HttpClient.put(parameters);

            return result.status == 200 ? NotifyHelper.sucesso() : NotifyHelper.erro(result.error);
        } catch (error) {
            return NotifyHelper.erro(error)
        }
    }

    public async recuperaPorId(templateId: string) {
        let parameters: IHttpClientRequestParameters = {
            url: `http://localhost:3000/template/${templateId}`,
            requiresToken: true
        }
        try {
            let result = await HttpClient.get(parameters);
            return result.data.template;

        } catch (error) {
            return null
        }
    }

    public async excluir(templateId: string) {
        let parameters: IHttpClientRequestParameters = {
            url: `http://localhost:3000/template/${templateId}`,
            requiresToken: true,
        }
        try {
            let result = await HttpClient.delete(parameters);
            return result.status == 204 ? NotifyHelper.sucesso() : NotifyHelper.erro(result.error);
        } catch (error) {
            return NotifyHelper.erro(error)
        }
    }

}