"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListPlaybackKeyPairsCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_restJson1_1 = require("../protocols/Aws_restJson1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Gets summary information about playback key pairs. For more information, see <a href="https://docs.aws.amazon.com/ivs/latest/userguide/private-channels.html">Setting Up Private
 *         Channels</a> in the <i>Amazon IVS User Guide</i>.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, ListPlaybackKeyPairsCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, ListPlaybackKeyPairsCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new ListPlaybackKeyPairsCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link ListPlaybackKeyPairsCommandInput} for command's `input` shape.
 * @see {@link ListPlaybackKeyPairsCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
class ListPlaybackKeyPairsCommand extends smithy_client_1.Command {
    // Start section: command_properties
    // End section: command_properties
    constructor(input) {
        // Start section: command_constructor
        super();
        this.input = input;
        // End section: command_constructor
    }
    /**
     * @internal
     */
    resolveMiddleware(clientStack, configuration, options) {
        this.middlewareStack.use(middleware_serde_1.getSerdePlugin(configuration, this.serialize, this.deserialize));
        const stack = clientStack.concat(this.middlewareStack);
        const { logger } = configuration;
        const clientName = "IvsClient";
        const commandName = "ListPlaybackKeyPairsCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.ListPlaybackKeyPairsRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.ListPlaybackKeyPairsResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_restJson1_1.serializeAws_restJson1ListPlaybackKeyPairsCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_restJson1_1.deserializeAws_restJson1ListPlaybackKeyPairsCommand(output, context);
    }
}
exports.ListPlaybackKeyPairsCommand = ListPlaybackKeyPairsCommand;
//# sourceMappingURL=ListPlaybackKeyPairsCommand.js.map