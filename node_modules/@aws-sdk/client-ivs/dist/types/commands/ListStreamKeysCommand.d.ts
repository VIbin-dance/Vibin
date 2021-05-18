import { IvsClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../IvsClient";
import { ListStreamKeysRequest, ListStreamKeysResponse } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface ListStreamKeysCommandInput extends ListStreamKeysRequest {
}
export interface ListStreamKeysCommandOutput extends ListStreamKeysResponse, __MetadataBearer {
}
/**
 * <p>Gets summary information about stream keys for the specified channel.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, ListStreamKeysCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, ListStreamKeysCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new ListStreamKeysCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListStreamKeysCommandInput} for command's `input` shape.
 * @see {@link ListStreamKeysCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
export declare class ListStreamKeysCommand extends $Command<ListStreamKeysCommandInput, ListStreamKeysCommandOutput, IvsClientResolvedConfig> {
    readonly input: ListStreamKeysCommandInput;
    constructor(input: ListStreamKeysCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: IvsClientResolvedConfig, options?: __HttpHandlerOptions): Handler<ListStreamKeysCommandInput, ListStreamKeysCommandOutput>;
    private serialize;
    private deserialize;
}
