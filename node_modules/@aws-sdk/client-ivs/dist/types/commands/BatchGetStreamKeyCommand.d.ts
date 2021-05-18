import { IvsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IvsClient";
import { BatchGetStreamKeyRequest, BatchGetStreamKeyResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface BatchGetStreamKeyCommandInput extends BatchGetStreamKeyRequest {
}
export interface BatchGetStreamKeyCommandOutput extends BatchGetStreamKeyResponse, __MetadataBearer {
}
/**
 * <p>Performs <a>GetStreamKey</a> on multiple ARNs simultaneously.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, BatchGetStreamKeyCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, BatchGetStreamKeyCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new BatchGetStreamKeyCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link BatchGetStreamKeyCommandInput} for command's `input` shape.
 * @see {@link BatchGetStreamKeyCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
export declare class BatchGetStreamKeyCommand extends $Command<BatchGetStreamKeyCommandInput, BatchGetStreamKeyCommandOutput, IvsClientResolvedConfig> {
    readonly input: BatchGetStreamKeyCommandInput;
    constructor(input: BatchGetStreamKeyCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IvsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<BatchGetStreamKeyCommandInput, BatchGetStreamKeyCommandOutput>;
    private serialize;
    private deserialize;
}
