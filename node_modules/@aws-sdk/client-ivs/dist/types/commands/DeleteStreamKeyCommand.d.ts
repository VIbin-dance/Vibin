import { IvsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IvsClient";
import { DeleteStreamKeyRequest } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface DeleteStreamKeyCommandInput extends DeleteStreamKeyRequest {
}
export interface DeleteStreamKeyCommandOutput extends __MetadataBearer {
}
/**
 * <p>Deletes the stream key for the specified ARN, so it can no longer be used to
 *       stream.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, DeleteStreamKeyCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, DeleteStreamKeyCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new DeleteStreamKeyCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DeleteStreamKeyCommandInput} for command's `input` shape.
 * @see {@link DeleteStreamKeyCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
export declare class DeleteStreamKeyCommand extends $Command<DeleteStreamKeyCommandInput, DeleteStreamKeyCommandOutput, IvsClientResolvedConfig> {
    readonly input: DeleteStreamKeyCommandInput;
    constructor(input: DeleteStreamKeyCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IvsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<DeleteStreamKeyCommandInput, DeleteStreamKeyCommandOutput>;
    private serialize;
    private deserialize;
}
