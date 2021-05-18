import { __extends } from "tslib";
import { DeleteRecordingConfigurationRequest } from "../models/models_0";
import { deserializeAws_restJson1DeleteRecordingConfigurationCommand, serializeAws_restJson1DeleteRecordingConfigurationCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Deletes the recording configuration for the specified ARN.</p>
 *          <p>If you try to delete a recording configuration that is associated with a channel, you will
 *       get an error (409 ConflictException). To avoid this, for all channels that reference the
 *       recording configuration, first use <a>UpdateChannel</a> to set the
 *         <code>recordingConfigurationArn</code> field to an empty string, then use
 *       DeleteRecordingConfiguration.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, DeleteRecordingConfigurationCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, DeleteRecordingConfigurationCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new DeleteRecordingConfigurationCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link DeleteRecordingConfigurationCommandInput} for command's `input` shape.
 * @see {@link DeleteRecordingConfigurationCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
var DeleteRecordingConfigurationCommand = /** @class */ (function (_super) {
    __extends(DeleteRecordingConfigurationCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function DeleteRecordingConfigurationCommand(input) {
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
    DeleteRecordingConfigurationCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IvsClient";
        var commandName = "DeleteRecordingConfigurationCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: DeleteRecordingConfigurationRequest.filterSensitiveLog,
            outputFilterSensitiveLog: function (output) { return output; },
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    DeleteRecordingConfigurationCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1DeleteRecordingConfigurationCommand(input, context);
    };
    DeleteRecordingConfigurationCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1DeleteRecordingConfigurationCommand(output, context);
    };
    return DeleteRecordingConfigurationCommand;
}($Command));
export { DeleteRecordingConfigurationCommand };
//# sourceMappingURL=DeleteRecordingConfigurationCommand.js.map