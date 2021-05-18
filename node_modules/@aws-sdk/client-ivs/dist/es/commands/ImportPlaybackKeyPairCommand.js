import { __extends } from "tslib";
import { ImportPlaybackKeyPairRequest, ImportPlaybackKeyPairResponse } from "../models/models_0";
import { deserializeAws_restJson1ImportPlaybackKeyPairCommand, serializeAws_restJson1ImportPlaybackKeyPairCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
/**
 * <p>Imports the public portion of a new key pair and returns its <code>arn</code> and
 *         <code>fingerprint</code>. The <code>privateKey</code> can then be used to generate viewer
 *       authorization tokens, to grant viewers access to private channels. For more information, see
 *         <a href="https://docs.aws.amazon.com/ivs/latest/userguide/private-channels.html">Setting Up
 *         Private Channels</a> in the <i>Amazon IVS User Guide</i>.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, ImportPlaybackKeyPairCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, ImportPlaybackKeyPairCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new ImportPlaybackKeyPairCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ImportPlaybackKeyPairCommandInput} for command's `input` shape.
 * @see {@link ImportPlaybackKeyPairCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
var ImportPlaybackKeyPairCommand = /** @class */ (function (_super) {
    __extends(ImportPlaybackKeyPairCommand, _super);
    // Start section: command_properties
    // End section: command_properties
    function ImportPlaybackKeyPairCommand(input) {
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
    ImportPlaybackKeyPairCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IvsClient";
        var commandName = "ImportPlaybackKeyPairCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: ImportPlaybackKeyPairRequest.filterSensitiveLog,
            outputFilterSensitiveLog: ImportPlaybackKeyPairResponse.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    ImportPlaybackKeyPairCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1ImportPlaybackKeyPairCommand(input, context);
    };
    ImportPlaybackKeyPairCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1ImportPlaybackKeyPairCommand(output, context);
    };
    return ImportPlaybackKeyPairCommand;
}($Command));
export { ImportPlaybackKeyPairCommand };
//# sourceMappingURL=ImportPlaybackKeyPairCommand.js.map