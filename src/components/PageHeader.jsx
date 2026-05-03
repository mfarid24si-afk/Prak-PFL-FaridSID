export default function PageHeader() {
    return (
        <div id="pageheader-container">
            <div id="pageheader-left">
                <span id="page-title">
                    Dashboard
                </span>
                <div id="breadcrumb-links">
                    <span id="breadcrumb-home">Dashboard</span>
                    <span id="breadcrumb-separator">/</span>
                    <span id="breadcrumb-current">Order List</span>
                </div>
            </div>
            <div id="action-button">
                <button id="add-button">
		                Add Button
		            </button>
            </div>
        </div>
    );
}