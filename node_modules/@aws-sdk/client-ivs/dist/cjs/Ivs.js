"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ivs = void 0;
const IvsClient_1 = require("./IvsClient");
const BatchGetChannelCommand_1 = require("./commands/BatchGetChannelCommand");
const BatchGetStreamKeyCommand_1 = require("./commands/BatchGetStreamKeyCommand");
const CreateChannelCommand_1 = require("./commands/CreateChannelCommand");
const CreateRecordingConfigurationCommand_1 = require("./commands/CreateRecordingConfigurationCommand");
const CreateStreamKeyCommand_1 = require("./commands/CreateStreamKeyCommand");
const DeleteChannelCommand_1 = require("./commands/DeleteChannelCommand");
const DeletePlaybackKeyPairCommand_1 = require("./commands/DeletePlaybackKeyPairCommand");
const DeleteRecordingConfigurationCommand_1 = require("./commands/DeleteRecordingConfigurationCommand");
const DeleteStreamKeyCommand_1 = require("./commands/DeleteStreamKeyCommand");
const GetChannelCommand_1 = require("./commands/GetChannelCommand");
const GetPlaybackKeyPairCommand_1 = require("./commands/GetPlaybackKeyPairCommand");
const GetRecordingConfigurationCommand_1 = require("./commands/GetRecordingConfigurationCommand");
const GetStreamCommand_1 = require("./commands/GetStreamCommand");
const GetStreamKeyCommand_1 = require("./commands/GetStreamKeyCommand");
const ImportPlaybackKeyPairCommand_1 = require("./commands/ImportPlaybackKeyPairCommand");
const ListChannelsCommand_1 = require("./commands/ListChannelsCommand");
const ListPlaybackKeyPairsCommand_1 = require("./commands/ListPlaybackKeyPairsCommand");
const ListRecordingConfigurationsCommand_1 = require("./commands/ListRecordingConfigurationsCommand");
const ListStreamKeysCommand_1 = require("./commands/ListStreamKeysCommand");
const ListStreamsCommand_1 = require("./commands/ListStreamsCommand");
const ListTagsForResourceCommand_1 = require("./commands/ListTagsForResourceCommand");
const PutMetadataCommand_1 = require("./commands/PutMetadataCommand");
const StopStreamCommand_1 = require("./commands/StopStreamCommand");
const TagResourceCommand_1 = require("./commands/TagResourceCommand");
const UntagResourceCommand_1 = require("./commands/UntagResourceCommand");
const UpdateChannelCommand_1 = require("./commands/UpdateChannelCommand");
/**
 * <p>
 *             <b>Introduction</b>
 *          </p>
 *
 *          <p>The Amazon Interactive Video Service (IVS) API is REST compatible, using a standard HTTP
 *       API and an AWS EventBridge event stream for responses. JSON is used for both requests and
 *       responses, including errors.</p>
 *
 *          <p>The API is an AWS regional service, currently in these regions: us-west-2, us-east-1, and
 *       eu-west-1.</p>
 *          <p>
 *             <i>
 *                <b>All API request parameters and URLs are case sensitive.
 *         </b>
 *             </i>
 *          </p>
 *
 *          <p>For a summary of notable documentation changes in each release, see <a href="https://docs.aws.amazon.com/ivs/latest/userguide/doc-history.html"> Document
 *       History</a>.</p>
 *
 *          <p>
 *             <b>Service Endpoints</b>
 *          </p>
 *          <p>The following are the Amazon IVS service endpoints (all HTTPS): </p>
 *          <p>Region name: US West (Oregon)</p>
 *          <ul>
 *             <li>
 *                <p>Region: <code>us-west-2</code>
 *                </p>
 *             </li>
 *             <li>
 *                <p>Endpoint: <code>ivs.us-west-2.amazonaws.com</code>
 *                </p>
 *             </li>
 *          </ul>
 *          <p>Region name: US East (Virginia)</p>
 *          <ul>
 *             <li>
 *                <p>Region: <code>us-east-1</code>
 *                </p>
 *             </li>
 *             <li>
 *                <p>Endpoint: <code>ivs.us-east-1.amazonaws.com</code>
 *                </p>
 *             </li>
 *          </ul>
 *          <p>Region name: EU West (Dublin)</p>
 *          <ul>
 *             <li>
 *                <p>Region: <code>eu-west-1</code>
 *                </p>
 *             </li>
 *             <li>
 *                <p>Endpoint: <code>ivs.eu-west-1.amazonaws.com</code>
 *                </p>
 *             </li>
 *          </ul>
 *
 *          <p>
 *             <b>Allowed Header Values</b>
 *          </p>
 *
 *          <ul>
 *             <li>
 *                <p>
 *                   <code>
 *                      <b>Accept:</b>
 *                   </code> application/json</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <code>
 *                      <b>Accept-Encoding:</b>
 *                   </code> gzip, deflate</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <code>
 *                      <b>Content-Type:</b>
 *                   </code>application/json</p>
 *             </li>
 *          </ul>
 *
 *          <p>
 *             <b>Resources</b>
 *          </p>
 *          <p>The following resources contain information about your IVS live stream (see <a href="https://docs.aws.amazon.com/ivs/latest/userguide/getting-started.html"> Getting Started with Amazon
 *         IVS</a>):</p>
 *
 *          <ul>
 *             <li>
 *                <p>Channel — Stores configuration data related to your live stream. You first create a
 *           channel and then use the channel’s stream key to start your live stream. See the Channel
 *           endpoints for more information. </p>
 *             </li>
 *             <li>
 *                <p>Stream key — An identifier assigned by Amazon IVS when you create a channel, which is
 *           then used to authorize streaming. See the StreamKey endpoints for more information.
 *               <i>
 *                      <b>Treat the stream key like a secret, since it allows
 *               anyone to stream to the channel.</b>
 *                   </i>
 *                </p>
 *             </li>
 *             <li>
 *                <p>Playback key pair — Video playback may be restricted using playback-authorization
 *           tokens, which use public-key encryption. A playback key pair is the public-private pair of
 *           keys used to sign and validate the playback-authorization token. See the PlaybackKeyPair
 *           endpoints for more information.</p>
 *             </li>
 *             <li>
 *                <p>Recording configuration — Stores configuration related to recording a live stream and
 *           where to store the recorded content. Multiple channels can reference the same recording
 *           configuration. See the Recording Configuration endpoints for more information.</p>
 *             </li>
 *          </ul>
 *
 *
 *
 *          <p>
 *             <b>Tagging</b>
 *          </p>
 *
 *          <p>A <i>tag</i> is a metadata label that you assign to an AWS resource. A tag
 *       comprises a <i>key</i> and a <i>value</i>, both set by you. For
 *       example, you might set a tag as <code>topic:nature</code> to label a particular video
 *       category. See <a href="https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html">Tagging AWS
 *         Resources</a> for more information, including restrictions that apply to tags.</p>
 *
 *          <p>Tags can help you identify and organize your AWS resources. For example, you can use the
 *       same tag for different resources to indicate that they are related. You can also use tags to
 *       manage access (see <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_tags.html">
 *         Access Tags</a>). </p>
 *
 *          <p>The Amazon IVS API has these tag-related endpoints: <a>TagResource</a>, <a>UntagResource</a>, and <a>ListTagsForResource</a>. The following
 *       resources support tagging: Channels, Stream Keys, Playback Key Pairs, and Recording
 *       Configurations.</p>
 *
 *          <p>
 *             <b>Authentication versus Authorization</b>
 *          </p>
 *          <p>Note the differences between these concepts:</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <i>Authentication</i> is about verifying identity. You need to be authenticated to sign Amazon IVS
 *           API requests.</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <i>Authorization</i> is about granting permissions. You need to be authorized to
 *         view <a href="https://docs.aws.amazon.com/ivs/latest/userguide/private-channels.html">Amazon IVS private channels</a>. (Private channels are channels that are enabled for
 *           "playback authorization.")</p>
 *             </li>
 *          </ul>
 *
 *          <p>
 *             <b>Authentication</b>
 *          </p>
 *          <p>All Amazon IVS API requests must be authenticated with a signature. The AWS Command-Line
 *       Interface (CLI) and Amazon IVS Player SDKs take care of signing the underlying API calls for
 *       you. However, if your application calls the Amazon IVS API directly, it’s your responsibility
 *       to sign the requests.</p>
 *          <p>You generate a signature using valid AWS credentials that have permission to perform the
 *       requested action. For example, you must sign PutMetadata requests with a signature generated
 *       from an IAM user account that has the <code>ivs:PutMetadata</code> permission.</p>
 *          <p>For more information:</p>
 *          <ul>
 *             <li>
 *                <p>Authentication and generating signatures — See <a href="https://docs.aws.amazon.com/AmazonS3/latest/API/sig-v4-authenticating-requests.html">Authenticating Requests (AWS Signature Version
 *         4)</a> in the <i>AWS General Reference</i>.</p>
 *             </li>
 *             <li>
 *                <p>Managing Amazon IVS permissions — See <a href="https://docs.aws.amazon.com/ivs/latest/userguide/security-iam.html">Identity and Access Management</a> on the Security page of
 *         the <i>Amazon IVS User Guide</i>.</p>
 *             </li>
 *          </ul>
 *
 *
 *          <p>
 *             <b>Channel Endpoints</b>
 *          </p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a>CreateChannel</a> — Creates a new channel and an associated stream
 *           key to start streaming.</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a>GetChannel</a> — Gets the channel configuration for the specified
 *           channel ARN (Amazon Resource Name).</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a>BatchGetChannel</a> — Performs <a>GetChannel</a> on
 *           multiple ARNs simultaneously.</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a>ListChannels</a> — Gets summary information about all channels in
 *           your account, in the AWS region where the API request is processed. This list can be
 *           filtered to match a specified name or recording-configuration ARN. Filters are mutually
 *           exclusive and cannot be used together. If you try to use both filters, you will get an
 *           error (409 Conflict Exception).</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a>UpdateChannel</a> — Updates a channel's configuration. This does
 *           not affect an ongoing stream of this channel. You must stop and restart the stream for the
 *           changes to take effect.</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a>DeleteChannel</a> — Deletes the specified channel.</p>
 *             </li>
 *          </ul>
 *
 *          <p>
 *             <b>StreamKey Endpoints</b>
 *          </p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a>CreateStreamKey</a> — Creates a stream key, used to initiate a
 *           stream, for the specified channel ARN.</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a>GetStreamKey</a> — Gets stream key information for the specified
 *           ARN.</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a>BatchGetStreamKey</a> — Performs <a>GetStreamKey</a> on
 *           multiple ARNs simultaneously.</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a>ListStreamKeys</a> — Gets summary information about stream keys
 *           for the specified channel.</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a>DeleteStreamKey</a> — Deletes the stream key for the specified
 *           ARN, so it can no longer be used to stream.</p>
 *             </li>
 *          </ul>
 *
 *
 *          <p>
 *             <b>Stream Endpoints</b>
 *          </p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a>GetStream</a> — Gets information about the active (live) stream on
 *           a specified channel.</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a>ListStreams</a> — Gets summary information about live streams in
 *           your account, in the AWS region where the API request is processed.</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a>StopStream</a> — Disconnects the incoming RTMPS stream for the
 *           specified channel. Can be used in conjunction with <a>DeleteStreamKey</a> to
 *           prevent further streaming to a channel.</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a>PutMetadata</a> — Inserts metadata into the active stream of the
 *           specified channel. A maximum of 5 requests per second per channel is allowed, each with a
 *           maximum 1 KB payload. (If 5 TPS is not sufficient for your needs, we recommend batching
 *           your data into a single PutMetadata call.)</p>
 *             </li>
 *          </ul>
 *
 *          <p>
 *             <b>PlaybackKeyPair Endpoints</b>
 *          </p>
 *          <p>For more information, see <a href="https://docs.aws.amazon.com/ivs/latest/userguide/private-channels.html">Setting Up Private Channels</a> in the
 *         <i>Amazon IVS User Guide</i>.</p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a>ImportPlaybackKeyPair</a> — Imports the public portion of a new
 *           key pair and returns its <code>arn</code> and <code>fingerprint</code>. The
 *             <code>privateKey</code> can then be used to generate viewer authorization tokens, to
 *           grant viewers access to  private channels (channels enabled for playback
 *           authorization).</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a>GetPlaybackKeyPair</a> — Gets a specified playback authorization
 *           key pair and returns the <code>arn</code> and <code>fingerprint</code>. The
 *             <code>privateKey</code> held by the caller can be used to generate viewer authorization
 *           tokens, to grant viewers access to private channels.</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a>ListPlaybackKeyPairs</a> — Gets summary information about playback
 *           key pairs.</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a>DeletePlaybackKeyPair</a> — Deletes a specified authorization key
 *           pair. This invalidates future viewer tokens generated using the key pair’s
 *             <code>privateKey</code>.</p>
 *             </li>
 *          </ul>
 *
 *          <p>
 *             <b>RecordingConfiguration Endpoints</b>
 *          </p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a>CreateRecordingConfiguration</a> — Creates a new recording configuration,
 *           used to enable recording to Amazon S3.</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a>GetRecordingConfiguration</a> — Gets the recording-configuration metadata
 *           for the specified ARN.</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a>ListRecordingConfigurations</a> — Gets summary information about all
 *           recording configurations in your account, in the AWS region where the API request is
 *           processed.</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a>DeleteRecordingConfiguration</a> — Deletes the recording
 *           configuration for the specified ARN.</p>
 *             </li>
 *          </ul>
 *
 *          <p>
 *             <b>AWS Tags Endpoints</b>
 *          </p>
 *          <ul>
 *             <li>
 *                <p>
 *                   <a>TagResource</a> — Adds or updates tags for the AWS resource with
 *           the specified ARN.</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a>UntagResource</a> — Removes tags from the resource with the
 *           specified ARN.</p>
 *             </li>
 *             <li>
 *                <p>
 *                   <a>ListTagsForResource</a> — Gets information about AWS tags for the
 *           specified ARN.</p>
 *             </li>
 *          </ul>
 */
class Ivs extends IvsClient_1.IvsClient {
    batchGetChannel(args, optionsOrCb, cb) {
        const command = new BatchGetChannelCommand_1.BatchGetChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    batchGetStreamKey(args, optionsOrCb, cb) {
        const command = new BatchGetStreamKeyCommand_1.BatchGetStreamKeyCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createChannel(args, optionsOrCb, cb) {
        const command = new CreateChannelCommand_1.CreateChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createRecordingConfiguration(args, optionsOrCb, cb) {
        const command = new CreateRecordingConfigurationCommand_1.CreateRecordingConfigurationCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    createStreamKey(args, optionsOrCb, cb) {
        const command = new CreateStreamKeyCommand_1.CreateStreamKeyCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteChannel(args, optionsOrCb, cb) {
        const command = new DeleteChannelCommand_1.DeleteChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deletePlaybackKeyPair(args, optionsOrCb, cb) {
        const command = new DeletePlaybackKeyPairCommand_1.DeletePlaybackKeyPairCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteRecordingConfiguration(args, optionsOrCb, cb) {
        const command = new DeleteRecordingConfigurationCommand_1.DeleteRecordingConfigurationCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    deleteStreamKey(args, optionsOrCb, cb) {
        const command = new DeleteStreamKeyCommand_1.DeleteStreamKeyCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getChannel(args, optionsOrCb, cb) {
        const command = new GetChannelCommand_1.GetChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getPlaybackKeyPair(args, optionsOrCb, cb) {
        const command = new GetPlaybackKeyPairCommand_1.GetPlaybackKeyPairCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getRecordingConfiguration(args, optionsOrCb, cb) {
        const command = new GetRecordingConfigurationCommand_1.GetRecordingConfigurationCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getStream(args, optionsOrCb, cb) {
        const command = new GetStreamCommand_1.GetStreamCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    getStreamKey(args, optionsOrCb, cb) {
        const command = new GetStreamKeyCommand_1.GetStreamKeyCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    importPlaybackKeyPair(args, optionsOrCb, cb) {
        const command = new ImportPlaybackKeyPairCommand_1.ImportPlaybackKeyPairCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listChannels(args, optionsOrCb, cb) {
        const command = new ListChannelsCommand_1.ListChannelsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listPlaybackKeyPairs(args, optionsOrCb, cb) {
        const command = new ListPlaybackKeyPairsCommand_1.ListPlaybackKeyPairsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listRecordingConfigurations(args, optionsOrCb, cb) {
        const command = new ListRecordingConfigurationsCommand_1.ListRecordingConfigurationsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listStreamKeys(args, optionsOrCb, cb) {
        const command = new ListStreamKeysCommand_1.ListStreamKeysCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listStreams(args, optionsOrCb, cb) {
        const command = new ListStreamsCommand_1.ListStreamsCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    listTagsForResource(args, optionsOrCb, cb) {
        const command = new ListTagsForResourceCommand_1.ListTagsForResourceCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    putMetadata(args, optionsOrCb, cb) {
        const command = new PutMetadataCommand_1.PutMetadataCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    stopStream(args, optionsOrCb, cb) {
        const command = new StopStreamCommand_1.StopStreamCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    tagResource(args, optionsOrCb, cb) {
        const command = new TagResourceCommand_1.TagResourceCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    untagResource(args, optionsOrCb, cb) {
        const command = new UntagResourceCommand_1.UntagResourceCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
    updateChannel(args, optionsOrCb, cb) {
        const command = new UpdateChannelCommand_1.UpdateChannelCommand(args);
        if (typeof optionsOrCb === "function") {
            this.send(command, optionsOrCb);
        }
        else if (typeof cb === "function") {
            if (typeof optionsOrCb !== "object")
                throw new Error(`Expect http options but get ${typeof optionsOrCb}`);
            this.send(command, optionsOrCb || {}, cb);
        }
        else {
            return this.send(command, optionsOrCb);
        }
    }
}
exports.Ivs = Ivs;
//# sourceMappingURL=Ivs.js.map