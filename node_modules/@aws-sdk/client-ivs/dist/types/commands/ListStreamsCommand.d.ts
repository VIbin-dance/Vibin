import { IvsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IvsClient";
import { ListStreamsRequest, ListStreamsResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ListStreamsCommandInput extends ListStreamsRequest {
}
export interface ListStreamsCommandOutput extends ListStreamsResponse, __MetadataBearer {
}
/**
 * <p>Gets summary information about live streams in your account, in the AWS region where the
 *       API request is processed.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, ListStreamsCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, ListStreamsCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new ListStreamsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListStreamsCommandInput} for command's `input` shape.
 * @see {@link ListStreamsCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
export declare class ListStreamsCommand extends $Command<ListStreamsCommandInput, ListStreamsCommandOutput, IvsClientResolvedConfig> {
    readonly input: ListStreamsCommandInput;
    constructor(input: ListStreamsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IvsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListStreamsCommandInput, ListStreamsCommandOutput>;
    private serialize;
    private deserialize;
}
