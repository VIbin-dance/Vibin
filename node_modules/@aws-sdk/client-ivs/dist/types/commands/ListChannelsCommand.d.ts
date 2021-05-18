import { IvsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IvsClient";
import { ListChannelsRequest, ListChannelsResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ListChannelsCommandInput extends ListChannelsRequest {
}
export interface ListChannelsCommandOutput extends ListChannelsResponse, __MetadataBearer {
}
/**
 * <p>Gets summary information about all channels in your account, in the AWS region where the
 *       API request is processed. This list can be filtered to match a specified name or
 *       recording-configuration ARN. Filters are mutually exclusive and cannot be used together. If
 *       you try to use both filters, you will get an error (409 ConflictException).</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, ListChannelsCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, ListChannelsCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new ListChannelsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListChannelsCommandInput} for command's `input` shape.
 * @see {@link ListChannelsCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
export declare class ListChannelsCommand extends $Command<ListChannelsCommandInput, ListChannelsCommandOutput, IvsClientResolvedConfig> {
    readonly input: ListChannelsCommandInput;
    constructor(input: ListChannelsCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IvsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListChannelsCommandInput, ListChannelsCommandOutput>;
    private serialize;
    private deserialize;
}
