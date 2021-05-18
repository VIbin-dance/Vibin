import { IvsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IvsClient";
import { BatchGetChannelRequest, BatchGetChannelResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface BatchGetChannelCommandInput extends BatchGetChannelRequest {
}
export interface BatchGetChannelCommandOutput extends BatchGetChannelResponse, __MetadataBearer {
}
/**
 * <p>Performs <a>GetChannel</a> on multiple ARNs simultaneously.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, BatchGetChannelCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, BatchGetChannelCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new BatchGetChannelCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link BatchGetChannelCommandInput} for command's `input` shape.
 * @see {@link BatchGetChannelCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
export declare class BatchGetChannelCommand extends $Command<BatchGetChannelCommandInput, BatchGetChannelCommandOutput, IvsClientResolvedConfig> {
    readonly input: BatchGetChannelCommandInput;
    constructor(input: BatchGetChannelCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IvsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<BatchGetChannelCommandInput, BatchGetChannelCommandOutput>;
    private serialize;
    private deserialize;
}
