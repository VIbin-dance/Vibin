import { __extends } from "tslib";
import { UpdateChannelRequest, UpdateChannelResponse } from "../models/models_0";
import { deserializeAws_restJson1UpdateChannelCommand, serializeAws_restJson1UpdateChannelCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Updates a channel's configuration. This does not affect an ongoing stream of this channel.
 *       You must stop and restart the stream for the changes to take effect.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, UpdateChannelCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, UpdateChannelCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new UpdateChannelCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link UpdateChannelCommandInput} for command's `input` shape.
 * @see {@link UpdateChannelCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
var UpdateChannelCommand = /** @class */ (function (_super) {
    __extends(UpdateChannelCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function UpdateChannelCommand(input) {
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
    UpdateChannelCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IvsClient";
        var commandName = "UpdateChannelCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: UpdateChannelRequest.filterSensitiveLog,
            outputFilterSensitiveLog: UpdateChannelResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    UpdateChannelCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1UpdateChannelCommand(input, context);
    };
    UpdateChannelCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1UpdateChannelCommand(output, context);
    };
    return UpdateChannelCommand;
}($Command));
export { UpdateChannelCommand };
//# sourceMappingURL=UpdateChannelCommand.js.map