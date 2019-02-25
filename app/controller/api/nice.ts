import { Controller } from "egg";
import { Contro, Get, Prefix } from "../../router";

@Prefix(["api", "nice"])
@Contro("/nice")
export default class ApiNiceController extends Controller {
  @Get("/my")
  public async my() {
    this.ctx.body = 2;
  }
}
