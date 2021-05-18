import { __extends } from "tslib";
import { BatchGetChannelRequest, BatchGetChannelResponse } from "../models/models_0";
import { deserializeAws_restJson1BatchGetChannelCommand, serializeAws_restJson1BatchGetChannelCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
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
var BatchGetChannelCommand = /** @class */ (function (_super) {
    __extends(BatchGetChannelCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function BatchGetChannelCommand(input) {
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
    BatchGetChannelCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IvsClient";
        var commandName = "BatchGetChannelCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: BatchGetChannelRequest.filterSensitiveLog,
            outputFilterSensitiveLog: BatchGetChannelResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    BatchGetChannelCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1BatchGetChannelCommand(input, context);
    };
    BatchGetChannelCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1BatchGetChannelCommand(output, context);
    };
    return BatchGetChannelCommand;
}($Command));
export { BatchGetChannelCommand };
//# sourceMappingURL=BatchGetChannelCommand.js.map