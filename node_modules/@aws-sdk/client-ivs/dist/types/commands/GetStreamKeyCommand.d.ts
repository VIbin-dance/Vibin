import { IvsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IvsClient";
import { GetStreamKeyRequest, GetStreamKeyResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetStreamKeyCommandInput extends GetStreamKeyRequest {
}
export interface GetStreamKeyCommandOutput extends GetStreamKeyResponse, __MetadataBearer {
}
/**
 * <p>Gets stream-key information for a specified ARN.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, GetStreamKeyCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, GetStreamKeyCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new GetStreamKeyCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetStreamKeyCommandInput} for command's `input` shape.
 * @see {@link GetStreamKeyCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
export declare class GetStreamKeyCommand extends $Command<GetStreamKeyCommandInput, GetStreamKeyCommandOutput, IvsClientResolvedConfig> {
    readonly input: GetStreamKeyCommandInput;
    constructor(input: GetStreamKeyCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IvsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetStreamKeyCommandInput, GetStreamKeyCommandOutput>;
    private serialize;
    private deserialize;
}
