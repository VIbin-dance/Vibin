import { IvsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IvsClient";
import { GetStreamRequest, GetStreamResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetStreamCommandInput extends GetStreamRequest {
}
export interface GetStreamCommandOutput extends GetStreamResponse, __MetadataBearer {
}
/**
 * <p>Gets information about the active (live) stream on a specified channel.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, GetStreamCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, GetStreamCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new GetStreamCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetStreamCommandInput} for command's `input` shape.
 * @see {@link GetStreamCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
export declare class GetStreamCommand extends $Command<GetStreamCommandInput, GetStreamCommandOutput, IvsClientResolvedConfig> {
    readonly input: GetStreamCommandInput;
    constructor(input: GetStreamCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IvsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetStreamCommandInput, GetStreamCommandOutput>;
    private serialize;
    private deserialize;
}
