import createUserTable from "./user.model.js";
import createMessageTable from "./message.model.js";

const DatabaseModel = async () => {
    await createMessageTable(),
    await createUserTable()
}

export default DatabaseModel;