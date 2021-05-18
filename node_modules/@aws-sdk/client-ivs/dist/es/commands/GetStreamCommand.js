import { __extends } from "tslib";
import { GetStreamRequest, GetStreamResponse } from "../models/models_0";
import { deserializeAws_restJson1GetStreamCommand, serializeAws_restJson1GetStreamCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
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
var GetStreamCommand = /** @class */ (function (_super) {
    __extends(GetStreamCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetStreamCommand(input) {
        var _this = 
        // Start section: command_constructor
        _super.call(this) || this;
        _this.input = input;
        return _this;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    GetStreamCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IvsClient";
        var commandName = "GetStreamCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetStreamRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetStreamResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetStreamCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetStreamCommand(input, context);
    };
    GetStreamCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetStreamCommand(output, context);
    };
    return GetStreamCommand;
}($Command));
export { GetStreamCommand };
//# sourceMappingURL=GetStreamCommand.js.map