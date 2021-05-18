import { __extends } from "tslib";
import { GetPlaybackKeyPairRequest, GetPlaybackKeyPairResponse } from "../models/models_0";
import { deserializeAws_restJson1GetPlaybackKeyPairCommand, serializeAws_restJson1GetPlaybackKeyPairCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Gets a specified playback authorization key pair and returns the <code>arn</code> and
 *         <code>fingerprint</code>. The <code>privateKey</code> held by the caller can be used to
 *       generate viewer authorization tokens, to grant viewers access to private channels. For more
 *       information, see <a href="https://docs.aws.amazon.com/ivs/latest/userguide/private-channels.html">Setting Up Private Channels</a> in the <i>Amazon IVS User
 *       Guide</i>.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, GetPlaybackKeyPairCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, GetPlaybackKeyPairCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new GetPlaybackKeyPairCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetPlaybackKeyPairCommandInput} for command's `input` shape.
 * @see {@link GetPlaybackKeyPairCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
var GetPlaybackKeyPairCommand = /** @class */ (function (_super) {
    __extends(GetPlaybackKeyPairCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function GetPlaybackKeyPairCommand(input) {
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
    GetPlaybackKeyPairCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IvsClient";
        var commandName = "GetPlaybackKeyPairCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetPlaybackKeyPairRequest.filterSensitiveLog,
            outputFilterSensitiveLog: GetPlaybackKeyPairResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetPlaybackKeyPairCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetPlaybackKeyPairCommand(input, context);
    };
    GetPlaybackKeyPairCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetPlaybackKeyPairCommand(output, context);
    };
    return GetPlaybackKeyPairCommand;
}($Command));
export { GetPlaybackKeyPairCommand };
//# sourceMappingURL=GetPlaybackKeyPairCommand.js.map