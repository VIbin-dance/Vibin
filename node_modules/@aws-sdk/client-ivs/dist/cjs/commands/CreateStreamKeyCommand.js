"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStreamKeyCommand = void 0;
const models_0_1 = require("../models/models_0");
const Aws_restJson1_1 = require("../protocols/Aws_restJson1");
const middleware_serde_1 = require("@aws-sdk/middleware-serde");
const smithy_client_1 = require("@aws-sdk/smithy-client");
/**
 * <p>Creates a stream key, used to initiate a stream, for the specified channel ARN.</p>
 *          <p>Note that <a>CreateChannel</a> creates a stream key. If you subsequently use
 *       CreateStreamKey on the same channel, it will fail because a stream key already exists and
 *       there is a limit of 1 stream key per channel. To reset the stream key on a channel, use <a>DeleteStreamKey</a> and then CreateStreamKey.</p>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { IvsClient, CreateStreamKeyCommand } from "@aws-sdk/client-ivs"; // ES Modules import
 * // const { IvsClient, CreateStreamKeyCommand } = require("@aws-sdk/client-ivs"); // CommonJS import
 * const client = new IvsClient(config);
 * const command = new CreateStreamKeyCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link CreateStreamKeyCommandInput} for command's `input` shape.
 * @see {@link CreateStreamKeyCommandOutput} for command's `response` shape.
 * @see {@link IvsClientResolvedConfig | config} for command's `input` shape.
 *
 */
class CreateStreamKeyCommand extends smithy_client_1.Command {
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
        const commandName = "CreateStreamKeyCommand";
        const handlerExecutionContext = {
            logger,
            clientName,
            commandName,
            inputFilterSensitiveLog: models_0_1.CreateStreamKeyRequest.filterSensitiveLog,
            outputFilterSensitiveLog: models_0_1.CreateStreamKeyResponse.filterSensitiveLog,
        };
        const { requestHandler } = configuration;
        return stack.resolve((request) => requestHandler.handle(request.request, options || {}), handlerExecutionContext);
    }
    serialize(input, context) {
        return Aws_restJson1_1.serializeAws_restJson1CreateStreamKeyCommand(input, context);
    }
    deserialize(output, context) {
        return Aws_restJson1_1.deserializeAws_restJson1CreateStreamKeyCommand(output, context);
    }
}
exports.CreateStreamKeyCommand = CreateStreamKeyCommand;
//# sourceMappingURL=CreateStreamKeyCommand.js.map