import { NavLink } from "react-router";

export function Assistant({ id, name, category, image, description }) {
    return (
        <>
            <div className="col-12 col-md-10 col-lg-8 mb-4">
                <div className="card shadow-sm border-0 rounded-4 p-3 d-flex flex-row align-items-center gap-4">
                    <div className="position-relative" style={{ width: "130px", height: "130px" }}>
                        <div className="avatar-background position-absolute top-0 start-0 w-100 h-100 rounded-circle"></div>
                        <img src={image} alt={name} className="rounded-circle position-relative"
                            style={{ width: "130px", height: "130px", objectFit: "cover", zIndex: 1, }} />
                    </div>
                    <div>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <h5 className="fw-semibold mb-0">{name}</h5>
                            <NavLink to={`/chat/${id}`}>
                                <div className="btn btn-outline-dark btn-sm rounded-pill d-inline-flex align-items-center gap-2 shadow-sm px-2 px-sm-4">
                                    <span style={{ minWidth: "120px" }}>
                                        Hablar con {name.toLowerCase()}
                                    </span>
                                    <i className="bi bi-chevron-right"></i>
                                </div>
                            </NavLink>
                        </div>
                        <p className="text-muted mb-1">
                            <i className="bi bi-tag me-1"></i>
                            {category}
                        </p>
                        <p className="text-secondary small mb-2">{description}</p>
                    </div>
                </div>
            </div>
        </>
    );
}